import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import React, { useEffect, useState, useRef } from 'react';

// import "./node_modules/ag-grid-community/dist/styles/ag-grid.css"
// import "./node_modules/ag-grid-community/dist/styles/ag-theme-alpine.css"
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

export default function App() {
  const path = 'https://v1.basketball.api-sports.io/leagues';
  const [rowData, setRowData] = useState([]);
  const gridRef = useRef(null);
  useEffect(async() => {
    try {
      const response = await fetch(
        path, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'x-rapidapi-key': '8a2d2671cd5d3f5b3c0966ef376c39c6',
          'x-rapidapi-host': 'v1.basketball.api-sports.io',
        }
      });
      const json = await response.json();
      let datos = json['response'];
      datos.forEach(element => {
        delete element['id'];
        element['country'] = element['country']['flag'];
        element['seasons'] = element['seasons'].length;
      });
      console.log("AWEQ", datos);
      setRowData(datos);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const ImageCell = params => {
    return '<img border="0" style="max-width:100%;max-height:100%;" height="auto" src="'+ params.value+'">';
  };
  const defaultColDef = {
    resizable: true,
    
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <div style={{margin: '10px'}}>
        <div style={{width: '100%', height: '100%', maxHeight: 'fit-content', maxWidth: 'fit-content', overflow: 'scroll', border: '1px solid black'}}>
          <div className="ag-theme-alpine" style={{width: 1020, height: 500}}>
            <AgGridReact  rowData={rowData}
                          defaultColDef={defaultColDef}
                          pagination="true"
                          paginationPageSize="9">
              <AgGridColumn field="country" sortable={true} filter={true} cellRenderer={ImageCell}></AgGridColumn>
              <AgGridColumn field="logo" sortable={true} filter={true} cellRenderer={ImageCell}></AgGridColumn>
              <AgGridColumn field="name" sortable={true} filter={true}></AgGridColumn>
              <AgGridColumn field="seasons" sortable={true} filter={true}></AgGridColumn>
              <AgGridColumn field="type" sortable={true} filter={true}></AgGridColumn>
            </AgGridReact>
          </div>
        </div>
      </div>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'dodgerblue',
    marginTop:StatusBar.currentHeight,
    // alignItems: 'center',
    // justifyContent: 'center',
    // overflow: 'scroll',
    padding: '10px',
  },
});
