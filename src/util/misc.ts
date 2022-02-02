// TODO: [LOW PRIOR] Add/find attribute & tagName types, recreate actual jquery method signature (https://stackoverflow.com/a/4158203), can also add event listeners
// jquery-style element creation.
// taken from https://stackoverflow.com/a/23899918 & adapted for typescript
export function createElementWithAttr<T extends HTMLElement>(
    tagName: string,
    attribute: Record<string, string> = {},
    children: (string | HTMLElement) | (string | HTMLElement)[] = []
): T {
    const el = document.createElement(tagName)
    if (typeof attribute === 'object') for (const key in attribute) el.setAttribute(key, attribute[key])

    if (!Array.isArray(children)) children = [children]

    children.forEach((child) => {
        if (child instanceof Element) el.appendChild(child)
        else el.appendChild(document.createTextNode(child))
    })
    return el as T
}
