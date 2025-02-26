import React from "react";

export default function Card({name, title, imageUrl}) {
  return (
    <div className="border grid grid-cols-2 flex h-40">
        <div className="flex-1 p-4">
            <h2 className="font-bold text-xl">{name}</h2>
            <h4>{title}</h4>
        </div>
        <div className="bg-gray-200 w-full">
            <img src={imageUrl} alt={name} className="object-cover w-full h-full"/>
        </div>
    </div>
  );
}