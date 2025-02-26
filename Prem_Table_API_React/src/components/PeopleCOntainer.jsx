import React, { useEffect, useState } from "react";
import Card from "./Card";
import { use } from "react";

export default function PeopleContainer() {
  const [People, setPeople] = useState([]);
  const [filteredPeople, setFilteredPeople] = useState([]);

  useEffect(() => {
    fetch("https://6792c8cacf994cc6804b0df4.mockapi.io/person").then(
    (response) => 
      response.json()).then((data) => {
      setPeople(data);
      setFilteredPeople(data);
    });
  }, []);

  const filterPeople = (filter) => {
      let filtered = People.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()));
      setFilteredPeople(filtered);
  };
  
  
  return (
    <div className="">
      <div className="fixed border margin-bottom-4 bg-white w-full h-28 p-8"> 
        <input 
          type="text" 
          placeholder="Search" 
          className="border p-4 " 
          onChange={(el) =>
          {
            console.log(el.target.value);
            filterPeople(el.target.value);
          }
        } />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-8 pt-32">
        {filteredPeople.map((person) => (
          <Card key={person.id} name={person.name} title={person.jobtitle} imageUrl={person.avatar} />
        ))}
      </div>
    </div>
  );
}