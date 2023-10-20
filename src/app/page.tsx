"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
const CardImages = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
];
type CardsType = {
  src: string | string[];
  id: number;
  matched: Boolean;
};
export default function Home() {
  const [cards, setCards] = useState<CardsType[]>([]);
  const [count, setCount] = useState<number>(0);
  const [choiseOne, setChoiseOne] = useState<null | CardsType>(null);
  const [choiseTwo, setChoiseTwo] = useState<null | CardsType>(null);
  const [disabled,setDisabled] = useState<boolean>(false);
  function suffleCards() {
    const suffleCard = [...CardImages, ...CardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(suffleCard);
    /**
     * Suffling
     * 1)At first convert 6 img in to 12
     * 2)Then sort() the images
     * 3)Then map() each img and add 'id'
     * Depending on Math.random() 'id' data is sorted by sort() method
     */
    setChoiseOne(null);
    setChoiseTwo(null);
    setCount(0);
  }
  const handleChoise = ({ card }: { card: CardsType }) => {
    choiseOne ? setChoiseTwo(card) : setChoiseOne(card);
  };
  const resetTurn = () => {
    setChoiseOne(null);
    setChoiseTwo(null);
    setCount((pre) => pre + 1);
    setDisabled(false);
  };
  useEffect(() => {
    if (choiseOne && choiseTwo) {
      setDisabled(true);
      if (choiseOne.src == choiseTwo.src) {
        setCards(pre=>{
          return pre.map((card)=>{
            if(card.src == choiseOne.src){
              return {...card,matched:true}
            }else{
              return card;
            }
          })
        })
        resetTurn();
      } else {
        setTimeout(()=>resetTurn(),1000)
      }
    }
  }, [choiseOne, choiseTwo]);
  useEffect(()=>{
    suffleCards();
  },[]);
  return (
    <main className="magic_game container mx-auto">
      <div className="header text-center my-5 leading-10 space-y-5">
        <h1 className="font-bold text-5xl">Magic Match</h1>
        <button
          className="border border-white px-2 rounded-md hover:bg-white hover:text-black transition-colors"
          onClick={suffleCards}
        >
          New Game
        </button>
        <div className="gird_cards grid grid-cols-4 w-[30%] mx-auto gap-6 place-items-center">
          {cards.map((card) => (
            <div className="card gird" key={card.id}>
              <div className={`[&>img]:border-2 [&>img]:border-white [&>img]:rounded-md ${(card == choiseOne || card == choiseTwo || card.matched) ? 'flipped' : ''}`}>
                <Image
                  src={card.src as string}
                  className="front"
                  width={100}
                  height={100}
                  alt="card front"
                />
                <Image
                  src={"/img/cover.png"}
                  className="back"
                  width={100}
                  height={100}
                  alt="card back"
                  onClick={() =>{!disabled && handleChoise({ card })}}
                />
              </div>
            </div>
          ))}
          <p>Turns: {count}</p>
        </div>
      </div>
    </main>
  );
}
