import React from 'react';
import './SchoolHeader.css';

export const SchoolHeader = ({ simple = false }) => {
  return (
    <div className="school-header">
      <div className="school-header-inner">

        {/* Izquierda */}
        <div className="header-left">
          <h3>Gobierno del Estado</h3>
          <h2>DURANGO</h2>
        </div>

        {/* Centrado */}
        <div className="header-center">
          <h1>Telesecundaria No. 531</h1>
          {!simple && <p>Sistema de Gestión Integral</p>}
        </div>

        {/* DErecha */}
        <div className="header-right">
          <h2>SETEL</h2>
          <p>Sistema Estatal de Telesecundaria</p>
        </div>

      </div>

      <div className="header-bar"></div>
    </div>
  );
};
