import React, { useState, useEffect } from "react";
import "./Player.css";
import logo1 from "../../assets/imagenes/logo-1.png";
import nave1 from "../../assets/imagenes/nave-1.png";
import ufo1 from "../../assets/imagenes/ufo-1.png";
import erizoCu1 from "../../assets/imagenes/erizo-cuerpo-1.png";
import erizoAc1 from "../../assets/imagenes/erizo-accesorio-1.png";

function Cubo(){

  const [saltar,setSaltar] = useState(false)

  useEffect(()=>{

    const sleep = (ms)=>{
      return new Promise(resolve => setTimeout(resolve,ms))
    }

    const handleClick = async ()=>{
      setSaltar(true)
      await sleep(1000)
      setSaltar(false)
    }

    document.addEventListener("click",handleClick)
    return()=>{
      document.removeEventListener("click",handleClick)
    }
  },[])

    return(
        <div className="cubo" style={{animation: saltar?"saltar 1s ease-in infinite":"none"}}>
            <img src={logo1} alt="Logo 1" />
        </div>
    );
}

function Nave(){
    const [movement, setMovement] = useState(0);

  useEffect(() => {
    let intervalId;

    const moverArriba = (prevMovement) => {
        console.log(prevMovement)
      let newMovement = prevMovement;
      console.log(newMovement)
        newMovement += 10;
      // Asegurarse de que el valor de movement no baje de 0 ni suba de 500
      newMovement = Math.max(0, Math.min(400, newMovement));
      return newMovement;
    };

    const moverAbajo = (prevMovement) => {
        let newMovement = prevMovement;
        newMovement -= 10;
      // Asegurarse de que el valor de movement no baje de 0 ni suba de 500
      newMovement = Math.max(0, Math.min(400, newMovement));
      return newMovement;
      };

    const handleMouseDown = () => {
      clearInterval(intervalId); // Detener el intervalo actual (si lo hay)
      intervalId = setInterval(() => {
        setMovement((prevMovement) => moverArriba(prevMovement));
      }, 50); // Iniciar intervalo de movimiento
    };

    const handleMouseUp = () => {
      clearInterval(intervalId); // Detener el intervalo actual (si lo hay)
      intervalId = setInterval(() => {
        setMovement((prevMovement) => moverAbajo(prevMovement));
      }, 30);
    };

    // Agrega event listeners para los eventos del ratón
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    // Limpia el intervalo y los event listeners al desmontar el componente
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="nave" style={{ transform: `translateY(-${movement}px)` }}>
        <img src={logo1} alt="Logo 1" />
        <img src={nave1} alt="Nave 1" />
    </div>
  );
}

function NavModes({ onSelect }) {
    return (
      <div className="btn-group w-50" role="group" aria-label="Basic outlined example" style={{ height: "200px",
       display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() => onSelect("cubo")}
        >
          Cubo
        </button>
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() => onSelect("nave")}
        >
          Nave
        </button>
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() => onSelect("ufo")}
        >
          UFO
        </button>
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() => onSelect("erizo")}
        >
          Erizo
        </button>
      </div>
    );
  }    

function Ufo(){
    const [movement, setMovement] = useState(0);

    useEffect(() => {

      let intervalId;

      function subirUfo(prevMovement){
        let newMovement
        newMovement = prevMovement + 40
        newMovement = Math.max(0, Math.min(400, newMovement));
        return newMovement;
      }

      const handleClick = () => {
        setMovement((prevMovement)=>subirUfo(prevMovement))
      };

      function bajarUfo(prevMovement) {
        let newMovement = prevMovement - 10;
        newMovement = Math.max(0, Math.min(400, newMovement));
        return newMovement;
      }
  
      intervalId = setInterval(() => {
        setMovement((prevMovement) => bajarUfo(prevMovement));
      }, 100);

      // Agrega event listeners para los eventos del ratón
      document.addEventListener("click", handleClick);
  
      // Limpia el intervalo y los event listeners al desmontar el componente
      return () => {
        document.removeEventListener("click", handleClick);
        clearInterval(intervalId);
      };
    }, []);//se ejecuta solo una vez el useEffect()

    useEffect(()=>{
      console.log(`El valor de movement: %d`,movement)
    },[movement])

    return(
        <div className="ufo" style={{ transform: `translateY(-${movement}px)` }}>
            <img src={logo1} alt="Logo 1" />
            <img src={ufo1} alt="ufo 1" />
        </div>
    )
  }

function Erizo(){
  const [movement, setMovement] = useState(0)

  useEffect(()=>{
    
  },[])

  return(
    <div className="erizo" style={{transform:`translateY(-${movement}px)`}}>
      <img src={erizoCu1} alt="erizo cuerpo 1"/>
      <img src={erizoAc1} alt="erizo accesorio 1"/>
    </div>
  );
}

export function Player() {
    const [selectedMode, setSelectedMode] = useState(null);
  
    return (
      <>
        {selectedMode != null &&  
        <button className="btn-menu" aria-label="Basic outlined example" onClick={()=>setSelectedMode(null)}>Volver Menu</button>}
        {selectedMode === null && (
          <NavModes onSelect={(mode) => setSelectedMode(mode)} />
        )}
        {selectedMode === "cubo" && <Cubo />}
        {selectedMode === "nave" && <Nave />}
        {selectedMode === "ufo" && <Ufo />}
        {selectedMode === "erizo" && <Erizo />}
      </>
    );
  }
  











