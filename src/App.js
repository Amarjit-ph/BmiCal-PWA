import React, { useState, useRef } from 'react';
import { IonItem, IonInput, IonLabel, IonButton } from '@ionic/react';
function App() {
  const WeightIRef = useRef();
  const HeightIRef = useRef();
  const [bmi, setBmi] = useState();
  const [vis, setvis] = useState(false);

  const Cal = () => {
    const W = WeightIRef.current.value;
    const H = HeightIRef.current.value * 0.3048;
    const BMI = W / (H * H);
    setBmi(BMI.toFixed(2));
    setvis(true);

  }
  const Clear = () => {
    WeightIRef.current.value = ''
    HeightIRef.current.value = ''
    setvis(false);

  }

  return (
    <ion-app >
      <ion-header>
        <ion-toolbar color='primary'>
          <ion-title>BMI Calculator</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content class="ion-padding">
        <h2>Body Mass Index</h2>
        <p>Body mass index (BMI) is a value derived from the mass (weight) and height of a person. The BMI is defined as the body mass divided by the square of the body height, and is universally expressed in units of kg/m2, resulting from mass in kilograms and height in metres.</p>

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
            </ion-column>
          </ion-row>
        </ion-grid>
        {
          vis ? <ion-text className='ion-padding' color='primary'><h2 style={{ border: 'solid #3880ff 2px', textAlign: 'center', padding: '3px' }}> BMI : {bmi}</h2> </ion-text> : <div></div>
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

        <div style={{ border: 'solid #3880ff 3px', padding: '3px', marginBottom: '10px' }}>
          <b>Design & Developed</b><br />
          Amarjit Pheiroijam
        </div>
      </ion-content>
    </ion-app >
  );
}

export default App;
