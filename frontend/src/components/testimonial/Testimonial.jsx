/* eslint-disable react/no-unescaped-entities */

const Testimonial = () => {
  return (
    <div>
      <section className="text-gray-600 body-font mb-10">
        {/* main  */}
        <div className="container px-5 py-10 mx-auto">
          {/* Heading  */}
          <h1 className=" text-center text-3xl font-bold text-black">
            Contribution
          </h1>
          {/* para  */}
          <h2 className=" text-center text-2xl font-semibold mb-10">
            What <span className=" text-pink-500">WE</span> did
          </h2>

            {/* Testimonial 2 */}
            <div className="w-fit mx-auto">
              <div className="h-full text-center">
                <img
                  alt="testimonial"
                  className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                  src="https://media-mct1-1.cdn.whatsapp.net/v/t61.24694-24/384718749_842988224038010_7437239831147690931_n.jpg?ccb=11-4&oh=01_Q5AaIH5yw74joDtVmCDcD-zeg7wn-Mx4u4OtuYBhiRCUVIOV&oe=6660A1CD&_nc_sid=e6ed6c&_nc_cat=105"
                />
                <p className="leading-relaxed">
                  Made Backend, Application Layer, and modified React Frontend. Responsible for intergrating React, Flask and MS SQL container
                  on Docker, implemented React Hooks and States to make webpages dynamic.
                </p>
                <span className="inline-block h-1 w-10 rounded bg-pink-500 mt-6 mb-4" />
                <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">
                  Syed Muhammad Irtaza Hyder
                </h2>
                <p className="text-gray-500">Developer</p>
              </div>
            </div>
          </div>
      </section>
    </div>
  );
};

export default Testimonial;
