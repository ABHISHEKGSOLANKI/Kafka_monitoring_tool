export default function Home() {
  return (
<section className="grid grid-cols-1 md:grid-cols-2">
<div className="bg-black text-white p-20 justify-between">
  <h5 className="text-6xl font-bold mb-4">Full Stack Java Developer</h5>
  <p className="mb-4">This is the home page of my portfolio website. Here you can find information about me, my skills, and my projects.</p>
  <p className="mb-4">Feel free to explore the different sections of the website to learn more about me and my work.</p>
  </div>
  <div className="bg-black text-white">
    <img src="01.jpg" alt="Placeholder Image" className=" h-full p-30 rounded-full" />
  </div>
</section>
  )
}