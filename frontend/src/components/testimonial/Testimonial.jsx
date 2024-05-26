/* eslint-disable react/no-unescaped-entities */

const Testimonial = () => {
  return (
    <div>
      <section className="text-gray-600 body-font mb-10">
        {/* main  */}
        <div className="container px-5 py-10 mx-auto">
          {/* Heading  */}
          <h1 className=" text-center text-3xl font-bold text-black">
            Testimonial
          </h1>
          {/* para  */}
          <h2 className=" text-center text-2xl font-semibold mb-10">
            What our <span className=" text-pink-500">customers</span> are
            saying
          </h2>

          <div className="flex flex-wrap -m-4">
            {/* Testimonial 1 */}
            <div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
              <div className="h-full text-center">
                <img
                  alt="testimonial"
                  className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                  src="https://media-mct1-1.cdn.whatsapp.net/v/t61.24694-24/439299505_759538876386062_530578184746558772_n.jpg?ccb=11-4&oh=01_Q5AaIMLNyRSVSomOwqYXsPrOCf46zKfXIbbQuPU8kAZGOBA1&oe=666017BF&_nc_sid=e6ed6c&_nc_cat=107"
                />
                <p className="leading-relaxed">
                  Nothing
                </p>
                <span className="inline-block h-1 w-10 rounded bg-pink-500 mt-6 mb-4" />
                <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">
                  Badar Husnain Sheiki
                </h2>
                <p className="text-gray-500">CTO</p>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
              <div className="h-full text-center">
                <img
                  alt="testimonial"
                  className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                  src="https://www.newvisiontheatres.com/wp-content/uploads/2023/06/Dwayne-Johnson.jpg"
                />
                <p className="leading-relaxed">
                  Made Backend and Application Layer. Responsible for intergrating React, Flask and MS SQL container
                  on Docker, implemented React Hooks and States to make webpages dynamic.
                </p>
                <span className="inline-block h-1 w-10 rounded bg-pink-500 mt-6 mb-4" />
                <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">
                  Syed Muhammad Irtaza Hyder
                </h2>
                <p className="text-gray-500">Develeoper</p>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="lg:w-1/3 lg:mb-0 p-4">
              <div className="h-full text-center">
                <img
                  alt="testimonial"
                  className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                  src="https://media-mct1-1.cdn.whatsapp.net/v/t61.24694-24/357361215_216947497973684_3322097608587011177_n.jpg?ccb=11-4&oh=01_Q5AaIKll_VF_u7mnyJwxG2a7zs-CXRi3ECcZfjHhj2kKoLvp&oe=66600441&_nc_sid=e6ed6c&_nc_cat=109"
                />
                <p className="leading-relaxed">
                  Developed React Webpages
                </p>
                <span className="inline-block h-1 w-10 rounded bg-pink-500 mt-6 mb-4" />
                <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">
                  Rafay Munir
                </h2>
                <p className="text-gray-500">UI Developer</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonial;
