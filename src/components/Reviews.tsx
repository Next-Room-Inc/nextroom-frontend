 
const people = [
    {
      name: 'Leonard Krasner',
      role: 'Looking for 2 BDR 1 Bath with move in date on or before September 2026 near Bronson',
      imageUrl:
        'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
   
    },
    {
      name: 'Leonard Krasner',
      role: 'Looking for 2 BDR 1 Bath with move in date on or before September 2026 near Bronson',
      imageUrl:
        'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
   
    },
    {
      name: 'Leonard Krasner',
      role: 'Looking for 2 BDR 1 Bath with move in date on or before September 2026 near Bronson',
      imageUrl:
        'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
   
    },
    {
      name: 'Leonard Krasner',
      role: 'Looking for 2 BDR 1 Bath with move in date on or before September 2026 near Bronson',
      imageUrl:
        'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
   
    },
    {
      name: 'Leonard Krasner',
      role: 'Looking for 2 BDR 1 Bath with move in date on or before September 2026 near Bronson',
      imageUrl:
        'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
   
    },
    
  ]

  
const Reviews = () => {
  return (
    <>
     <div className="bg-white pt-24 pb-0 ">
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
        <div className="mx-auto max-w-2xl">
           <p className="mt-2 text-4xl font-semibold tracking-tight text-balance text-[#7C221F] sm:text-5xl">
            We have worked with thousands of amazing people
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8"
        >
          {people.map((person) => (
            <li key={person.name} className="rounded-2xl bg-[#ffffff] outline outline-gray-300 px-8 py-10">
              <img alt="" src={person.imageUrl} className="mx-auto size-48 rounded-full md:size-56" />
              <h3 className="mt-6 text-base/7 font-semibold tracking-tight text-black">{person.name}</h3>
              <p className="text-sm/6 text-black">{person.role}</p>
              
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  )
}

export default Reviews