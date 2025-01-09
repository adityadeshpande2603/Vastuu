const ListPageSearchBar = () => {
    return (
        <div className="ListPageSearchBar p-4 rounded-lg shadow-lg">
            <form>
                <div className="filter">
                    <h1 className="text-xl mb-4">
                        Search results for <b>London</b>
                    </h1>

                    <div className="top mb-6">
                        <div className="item flex flex-col">
                            <label htmlFor="city" className="text-xs mb-1">Location</label>
                            <input
                                className="border-solid border-2 w-full  p-2"
                                type="text"
                                id="city"
                                name="city"
                                placeholder="City Location"
                            />
                        </div>
                    </div>

                    <div className="bottom flex flex-wrap  justify-between">
                        <div className="item flex flex-col">
                            <label htmlFor="type" className="text-xs mb-1">Type</label>
                            <select name="type" className="border-solid border-2 p-2 w-24" id="type">
                                <option value="">any</option>
                                <option value="buy">Buy</option>
                                <option value="rent">Rent</option>
                            </select>
                        </div>

                        <div className="item flex flex-col">
                            <label htmlFor="property" className="text-xs mb-1">Property</label>
                            <select name="property" id="property" className="border-solid border-2 p-2 w-24">
                                <option value="">any</option>
                                <option value="apartment">Apartment</option>
                                <option value="house">House</option>
                                <option value="condo">Condo</option>
                                <option value="land">Land</option>
                            </select>
                        </div>

                        <div className="item flex flex-col">
                            <label htmlFor="minPrice" className="text-xs mb-1">Min Price</label>
                            <input
                                className="border-solid border-2 p-2 w-24"
                                type="number"
                                id="minPrice"
                                name="minPrice"
                                placeholder="any"
                            />
                        </div>

                        <div className="item flex flex-col">
                            <label htmlFor="maxPrice" className="text-xs mb-1">Max Price</label>
                            <input
                                className="border-solid border-2 p-2 w-24"
                                type="text"
                                id="maxPrice"
                                name="maxPrice"
                                placeholder="any"
                            />
                        </div>

                        <div className="item flex flex-col">
                            <label htmlFor="bedroom" className="text-xs mb-1">Bedroom</label>
                            <input
                                className="border-solid border-2 p-2 w-24"
                                type="text"
                                id="bedroom"
                                name="bedroom"
                                placeholder="any"
                            />
                        </div>
                        <div className="flex flex-col">

                            <button type="submit" className="p-2 bg-yellow-400 rounded-lg h-16 flex items-center">
                                <img src="/public/search.png" alt="Search" />
                            </button>
                        </div>

                    </div>
                </div>
            </form>
        </div>
    );
};

export default ListPageSearchBar;