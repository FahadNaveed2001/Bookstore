import React from 'react'
import './accounts.scss'
import Hero from './comps/hero/Hero'
import Booklist from './comps/booklist/Booklist'
import Addbook from './comps/addbook/Addbook'
import Aboutme from './comps/Aboutme/Aboutme'
import Contact from './comps/Contact/Contact'
import Mps from './comps/mps/Mps'
 

const Accounts = () => {
  return (

    <div>
      <section>
        <Hero />
      </section>
      <section>
        <Mps/>
        </section>
      <section>
        <Booklist />
      </section>
      <section>
      <Addbook />
      </section>
      <section>
      <Aboutme />
      </section>
      <section>
      <Contact />
      </section>

    </div>

  )
}

export default Accounts
