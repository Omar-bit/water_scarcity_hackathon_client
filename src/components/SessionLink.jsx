import React from 'react';
import { Link } from 'react-router-dom';
import { BiSolidReport } from 'react-icons/bi';

function SessionLink({ name, index, id }) {
  console.log(id);

  return (
    <Link
      className='  flex items-center  justify-center text-main gap-1'
      to={`/session/${id}`}
    >
      <BiSolidReport />

      <span className=' font-semibold underline'>{name}</span>
    </Link>
  );
}

export default SessionLink;
