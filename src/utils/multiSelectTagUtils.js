export const categoryToOption = (category) => ({
    value: category._id,
    label: category.title,
});

export const filterCategories = (inputValue, categoriesData) => {
    console.log("categories data before converting: ", categoriesData);
    
    const filteredOptions = categoriesData
    .map(categoryToOption)
    .filter((category) => category.label.toLowerCase().includes(inputValue.toLowerCase())
    );
    
    console.log("categories data after converting: ", filteredOptions);
    
    return filteredOptions
}