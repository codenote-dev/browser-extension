import { Disclosure, Menu } from '@headlessui/react';
import { FilterList, Search, Sort } from 'iconoir-react';

const filters = {
    price: [
        { value: '0', label: '$0 - $25', checked: false },
        { value: '25', label: '$25 - $50', checked: false },
        { value: '50', label: '$50 - $75', checked: false },
        { value: '75', label: '$75+', checked: false },
    ],
    color: [
        { value: 'white', label: 'White', checked: false },
        { value: 'beige', label: 'Beige', checked: false },
        { value: 'blue', label: 'Blue', checked: true },
        { value: 'brown', label: 'Brown', checked: false },
        { value: 'green', label: 'Green', checked: false },
        { value: 'purple', label: 'Purple', checked: false },
    ],
    size: [
        { value: 'xs', label: 'XS', checked: false },
        { value: 's', label: 'S', checked: true },
        { value: 'm', label: 'M', checked: false },
        { value: 'l', label: 'L', checked: false },
        { value: 'xl', label: 'XL', checked: false },
        { value: '2xl', label: '2XL', checked: false },
    ],
    category: [
        {
            value: 'all-new-arrivals',
            label: 'All New Arrivals',
            checked: false,
        },
        { value: 'tees', label: 'Tees', checked: false },
        { value: 'objects', label: 'Objects', checked: false },
        { value: 'sweatshirts', label: 'Sweatshirts', checked: false },
        { value: 'pants-and-shorts', label: 'Pants & Shorts', checked: false },
    ],
};
const sortOptions = [
    { name: 'Most Popular', href: '#', current: true },
    { name: 'Best Rating', href: '#', current: false },
    { name: 'Newest', href: '#', current: false },
];

export function Filters() {
    return (
        <>
            <div className="mt-2 flex rounded-md shadow-sm">
                <div className="relative flex flex-grow items-stretch focus-within:z-10">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Search
                            className="mr-2"
                            color="rgba(255, 255, 255, 0.5)"
                            height="18"
                            width="18"
                            aria-hidden="true"
                        />
                    </div>
                    <input
                        type="text"
                        name="search"
                        id="search"
                        className="block w-full rounded-md border-0 bg-white/5 py-1.5 pl-10 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                        placeholder="Search"
                    />
                </div>
            </div>
            <Disclosure
                as="section"
                aria-labelledby="filter-heading"
                className="grid items-center border-b border-t border-[#3D4043]">
                <div className="relative col-start-1 row-start-1 p-3">
                    <Disclosure.Button className="group flex items-center font-medium text-white">
                        <FilterList
                            className="mr-2"
                            color="#fff"
                            height="18"
                            width="18"
                            aria-hidden="true"
                        />
                        Filters
                    </Disclosure.Button>
                </div>
                <Disclosure.Panel className="border-t border-gray-200 py-10">
                    <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 px-4 text-sm sm:px-6 md:gap-x-6 lg:px-8">
                        <div className="grid auto-rows-min grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-6">
                            <fieldset>
                                <legend className="block font-medium">
                                    Price
                                </legend>
                                <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                                    {filters.price.map((option, optionIdx) => (
                                        <div
                                            key={option.value}
                                            className="flex items-center text-base sm:text-sm">
                                            <input
                                                id={`price-${optionIdx}`}
                                                name="price[]"
                                                defaultValue={option.value}
                                                type="checkbox"
                                                className="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                defaultChecked={option.checked}
                                            />
                                            <label
                                                htmlFor={`price-${optionIdx}`}
                                                className="ml-3 min-w-0 flex-1 text-gray-600">
                                                {option.label}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </fieldset>
                            <fieldset>
                                <legend className="block font-medium">
                                    Color
                                </legend>
                                <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                                    {filters.color.map((option, optionIdx) => (
                                        <div
                                            key={option.value}
                                            className="flex items-center text-base sm:text-sm">
                                            <input
                                                id={`color-${optionIdx}`}
                                                name="color[]"
                                                defaultValue={option.value}
                                                type="checkbox"
                                                className="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                defaultChecked={option.checked}
                                            />
                                            <label
                                                htmlFor={`color-${optionIdx}`}
                                                className="ml-3 min-w-0 flex-1 text-gray-600">
                                                {option.label}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </fieldset>
                        </div>
                        <div className="grid auto-rows-min grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-6">
                            <fieldset>
                                <legend className="block font-medium">
                                    Size
                                </legend>
                                <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                                    {filters.size.map((option, optionIdx) => (
                                        <div
                                            key={option.value}
                                            className="flex items-center text-base sm:text-sm">
                                            <input
                                                id={`size-${optionIdx}`}
                                                name="size[]"
                                                defaultValue={option.value}
                                                type="checkbox"
                                                className="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                defaultChecked={option.checked}
                                            />
                                            <label
                                                htmlFor={`size-${optionIdx}`}
                                                className="ml-3 min-w-0 flex-1 text-gray-600">
                                                {option.label}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </fieldset>
                            <fieldset>
                                <legend className="block font-medium">
                                    Category
                                </legend>
                                <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                                    {filters.category.map(
                                        (option, optionIdx) => (
                                            <div
                                                key={option.value}
                                                className="flex items-center text-base sm:text-sm">
                                                <input
                                                    id={`category-${optionIdx}`}
                                                    name="category[]"
                                                    defaultValue={option.value}
                                                    type="checkbox"
                                                    className="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                    defaultChecked={
                                                        option.checked
                                                    }
                                                />
                                                <label
                                                    htmlFor={`category-${optionIdx}`}
                                                    className="ml-3 min-w-0 flex-1 text-gray-600">
                                                    {option.label}
                                                </label>
                                            </div>
                                        ),
                                    )}
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </Disclosure.Panel>
                <div className="col-start-1 row-start-1 p-3">
                    <div className="mx-auto flex max-w-7xl justify-end px-4 sm:px-6 lg:px-8">
                        <Menu as="div" className="relative inline-block">
                            <div className="flex">
                                <Menu.Button className="group inline-flex justify-center text-sm font-medium text-white">
                                    <Sort
                                        className="mr-2"
                                        color="#fff"
                                        height="18"
                                        width="18"
                                        aria-hidden="true"
                                    />
                                    Sort
                                </Menu.Button>
                            </div>

                            <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
                                <div className="py-1">
                                    {sortOptions.map((option) => (
                                        <Menu.Item key={option.name}>
                                            {() => (
                                                <a href={option.href}>
                                                    {option.name}
                                                </a>
                                            )}
                                        </Menu.Item>
                                    ))}
                                </div>
                            </Menu.Items>
                        </Menu>
                    </div>
                </div>
            </Disclosure>
        </>
    );
}
