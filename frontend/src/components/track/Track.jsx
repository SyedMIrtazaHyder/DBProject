const Track = () => {
  return (
    <section>
      <div className=" container mx-auto px-5 py-10 md:py-14">
        {/* main  */}
        <div className="flex flex-wrap -m-4 text-center">
          {/* Track 1 */}
          <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
            <div className="border-2 hover:shadow-xl hover:shadow-gray-200 border-gray-200 bg-gray-100 shadow-[inset_0_0_2px_rgba(0,0,0,0.6)] px-4 py-6 rounded-lg">
              <svg
                className="text-red-600 w-12 h-12 mb-3 inline-block"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                  <path d="M17,21V19a4,4,0,0,0-4-4H5a4,4,0,0,0-4,4v2" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                  <circle cx="9" cy="7" r="4" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                  <line x1="17" y1="11" x2="23" y2="11" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                  <line x1="20" y1="8" x2="20" y2="14" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
              </svg>

              <h2 className="title-font font-medium text-lg text-gray-900">
                Login and Sign Up for Customers
              </h2>
              <p className="leading-relaxed">
                Authentication done via database to check for valid and invalid users.
              </p>
            </div>
          </div>

          {/* Track 2 */}
          <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
            <div className="border-2 hover:shadow-xl hover:shadow-gray-200 border-gray-200 bg-gray-100 shadow-[inset_0_0_2px_rgba(0,0,0,0.6)] px-4 py-6 rounded-lg">
              <svg
                className="text-red-600 w-12 h-12 mb-3 inline-block"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <g>
                  <path d="M16.95 2.58c1.96 1.95 1.96 5.12 0 7.07-1.51 1.51-3.75 1.84-5.59 1.01l-1.87 3.31-2.99.31L5 18H2l-1-2 7.95-7.69c-.92-1.87-.62-4.18.93-5.73 1.95-1.96 5.12-1.96 7.07 0zm-2.51 3.79c.74 0 1.33-.6 1.33-1.34 0-.73-.59-1.33-1.33-1.33-.73 0-1.33.6-1.33 1.33 0 .74.6 1.34 1.33 1.34z"/>
                </g>
              </svg>

              <h2 className="title-font font-medium text-lg text-gray-900">
                Admin
              </h2>
              <p className="leading-relaxed">
                Can add products and oversee the sales history and products.
              </p>
            </div>
          </div>

          {/* Track 3  */}
          <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
            <div className="border-2 hover:shadow-xl hover:shadow-gray-200 border-gray-200 bg-gray-100 shadow-[inset_0_0_2px_rgba(0,0,0,0.6)] px-4 py-6 rounded-lg">
              <svg
                className="text-red-600 w-12 h-12 mb-3 inline-block"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path d="M11 6C13.7614 6 16 8.23858 16 11M16.6588 16.6549L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>

              <h2 className="title-font font-medium text-lg text-gray-900">
                Live Searching
              </h2>
              <p className="leading-relaxed">
                Searches via keywords, product names and even Brands!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Track;
