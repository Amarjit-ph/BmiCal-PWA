import React, { useState, useRef } from 'react';
import { IonItem, IonInput, IonLabel, IonButton } from '@ionic/react';

import { Plugins } from '@capacitor/core';


function App() {

  const { Device, Geolocation } = Plugins;

  const WeightIRef = useRef();
  const HeightIRef = useRef();
  const [bmi, setBmi] = useState();
  const [vis, setvis] = useState(false);

  const [la, setla] = useState();
  const [lo, setlo] = useState();
  const [g, setg] = useState(false);


  const info = Device.getInfo();
  info.then((res) => {
    console.log(res);
  })


  const Cal = () => {
    const W = WeightIRef.current.value;
    const H = HeightIRef.current.value * 0.3048;
    const BMI = W / (H * H);
    setBmi(BMI.toFixed(2));
    setvis(true);
    console.log(info);

  }
  const Clear = () => {
    WeightIRef.current.value = ''
    HeightIRef.current.value = ''
    setvis(false);
    setg(false);

  }
  const getloc = () => {
    const coordinates = Geolocation.getCurrentPosition();
    coordinates.then((res) => {
      //console.log(res);
      const La = res.coords.latitude;
      const Lo = res.coords.longitude;

      setla(La);
      setlo(Lo);
      setg(true);
    })

  }

  return (
    <ion-app >
      <ion-header>
        <ion-toolbar color='primary'>
          <ion-title>BMI Calculator</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content class="ion-padding">
        <h3>Body Mass Index</h3>
        <p>BMI is a screening tool that can indicate whether a person is underweight or if they have a healthy weight, excess weight, or obesity. If a person's BMI is outside of the healthy range, their health risks may increase significantly</p>

        <IonItem>
          <IonLabel position="fixed">Height (ft) :</IonLabel>
          <IonInput type='number' ref={HeightIRef}></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel position="fixed">Weight (kg):</IonLabel>
          <IonInput type='number' ref={WeightIRef}></IonInput>
        </IonItem>

        <ion-grid>
          <ion-row>
            <ion-column>
              <IonButton class='ion-margin-top' color="primary" size='1' onClick={() => Cal()}>CALCULATE</IonButton>
              <IonButton class='ion-margin-top' color="primary" size='5' onClick={() => Clear()}>CLEAR</IonButton>
              <IonButton class='ion-margin-top' color="primary" size='5' onClick={() => getloc()}>GET LOCATION</IonButton>
            </ion-column>
          </ion-row>
        </ion-grid>
        {
          vis ? <ion-text className='ion-padding' color='primary'><h2 style={{ border: 'solid #3880ff 2px', textAlign: 'center', padding: '3px' }}> BMI : {bmi}</h2> </ion-text> : <div></div>
        }
        {
          g ? <ion-text className='ion-padding'><h4 style={{ border: 'solid #3880ff 2px', textAlign: 'center', padding: '3px' }}> Latitiude : {la} <br /> Longitude : {lo}</h4> </ion-text> : <div></div>
        }


        <table style={{
          width: '100%',
        }}>
          < tr >
            <td><b>Category</b></td>
            <td><b>BMI range - kg/m</b></td>
          </tr>
          <tr>
            <td>Severe Thinness</td>
            <td>{`< 16`}</td>
          </tr>
          <tr>
            <td>Moderate Thinness</td>
            <td>16 - 17</td>
          </tr>
          <tr>
            <td>Mild Thinness<br /></td>
            <td>17 - 18.5<br /></td>
          </tr>
          <tr>
            <td>Normal</td>
            <td>18.5 - 25<br /></td>
          </tr>
          <tr>
            <td>Overweight</td>
            <td>25 - 30</td>
          </tr>
          <tr>
            <td>Obese Class I<br /></td>
            <td>30 - 35<br /></td>
          </tr>
          <tr>
            <td>   Obese Class II</td>
            <td>35 - 40</td>
          </tr>
          <tr>
            <td>Obese Class III</td>
            <td> {`< 40`}</td>
          </tr>
        </table>
        <br />

        <div style={{ border: 'solid #3880ff 3px', padding: '3px', marginBottom: '5px', backgroundColor: '#3880ff', color: "white", borderRadius: '3px' }}>
          <b>Design & Developed</b><br />
          Amarjit Pheiroijam
        </div>
      </ion-content>
    </ion-app >
  );
}

export default App;
