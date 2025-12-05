import './landingPage.css'
import React from "react";
import Card from '../components/card/card';

export default function LandingPage({}) {
  return (
    <section className='games-grid'>
      <Card 
        title="Classic Game 1"
        content="This is a description of Classic Game 1."
        imgSrc="https://www.xtrafondos.com/thumbs/webp/1_3126.webp"
        imgAlt="Classic Game 1 Cover"
      />
      <Card 
        title="Classic Game 1"
        content="This is a description of Classic Game 1."
        imgSrc="https://www.xtrafondos.com/thumbs/webp/1_3126.webp"
        imgAlt="Classic Game 1 Cover"
      />
    </section>
  )
}