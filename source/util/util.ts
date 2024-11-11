export function toTitleCase(str: string): string {
    return str
        .replace(/-/g, ' ')
        .replace(
            /\w\S*/g,
            (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase()
        );
}

