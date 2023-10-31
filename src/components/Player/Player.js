import React, { useState, useEffect } from "react";
import "./Player.css";
import logo1 from "../../assets/imagenes/logo-1.png";
import nave1 from "../../assets/imagenes/nave-1.png";


function Cubo(){
    return(
        <div className="cubo">
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
      }, 100); // Iniciar intervalo de movimiento
    };

    const handleMouseUp = () => {
      clearInterval(intervalId); // Detener el intervalo actual (si lo hay)
      intervalId = setInterval(() => {
        setMovement((prevMovement) => moverAbajo(prevMovement));
      }, 100);
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

  useEffect(() => {
    console.log("Valor actual de movement:", movement);
  }, [movement]);

  return (
    <div className="nave" style={{ transform: `translateY(-${movement}px)` }}>
        <img src={logo1} alt="Logo 1" />
        <img src={nave1} alt="Nave 1" />
    </div>
  );
}

function NavModes({ onSelect }) {
    return (
      <div className="btn-group w-50" role="group" aria-label="Basic outlined example" style={{ height: "150px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
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
      </div>
    );
  }    

  export function Player() {
    const [selectedMode, setSelectedMode] = useState(null);
  
    return (
      <>
        {selectedMode != null &&  <button className="btn-menu" aria-label="Basic outlined example" onClick={()=>setSelectedMode(null)}>Volver Menu</button>}
        {selectedMode === null && (
          <NavModes onSelect={(mode) => setSelectedMode(mode)} />
        )}
        {selectedMode === "cubo" && <Cubo />}
        {selectedMode === "nave" && <Nave />}
      </>
    );
  }
  











