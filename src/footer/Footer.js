import React from 'react'
const year=new Date().getFullYear()

const Footer = () => {
  return (
 <footer className="mt-10 mb-4 text-sm text-gray-500 text-center">
        Developed by Ousman Mohammed © {year}
      </footer>  )
}

export default Footer