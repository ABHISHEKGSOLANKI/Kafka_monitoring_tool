export const sorting = (filteredActiveBrokers, sortField, sortDirection) => {
    return [...filteredActiveBrokers].sort((a, b) => {
        const valA = a[sortField];
        const valB = b[sortField];

    if (!isNaN(valA) && !isNaN(valB)) {
        return sortDirection === "asc"
            ? Number(valA) - Number(valB)
            : Number(valB) - Number(valA);
    }

    return sortDirection === "asc"
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
});
}   

export const handleSort = (field, sortField, setSortField, sortDirection, setSortDirection) => {
        if (field === sortField) {
            setSortDirection(prev => (prev === "asc" ? "desc" : "asc"));
        } else {
            setSortField(field);
            setSortDirection("asc");
        }
    };