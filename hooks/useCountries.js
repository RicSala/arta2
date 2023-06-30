import countries from "world-countries";

// About custom hooks: https://react.dev/learn/reusing-logic-with-custom-hooks
// TODO: ABOUT HOOKS (read the previous docs)
// Hooks allow you to share "logic" between components so you don't have to rewrite it -> they separate "UI logic" from the component itself
// they can realy on built-in hooks or other custom hooks
// 
// 


const formattedCountries = countries.map((country) => ({
    label: country.name.common,
    value: country.cca2,
    flag: country.flag, // TODO: if you are not getting the flag, the problem is probably here
    latlng: country.latlng,
    region: country.region,
}));

const useCountries = () => {

    const getAll = () => {
        return formattedCountries;
    }

    const getByValue = (value) => {
        return formattedCountries.find((item) => item.value === value);
    }

    return {
        getAll,
        getByValue,
    }
}

export default useCountries;