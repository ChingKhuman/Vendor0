
import React from 'react';
import { StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper'

const Table = () => {
    return (
      <DataTable style={styles.container}>
        <DataTable.Header style={styles.tableHeader}>
          <DataTable.Title style={styles.title}>Sl No</DataTable.Title>
          <DataTable.Title style={styles.title}>Message </DataTable.Title>
          <DataTable.Title style={styles.title}>Date</DataTable.Title>
        </DataTable.Header>
        <DataTable.Row style={styles.table1}>
          <DataTable.Cell></DataTable.Cell>
          <DataTable.Cell>No Data</DataTable.Cell>
          <DataTable.Cell></DataTable.Cell>

          
        </DataTable.Row>
    
       
      </DataTable>
    );
  };

  const styles = StyleSheet.create({
    container: {
      padding: 15,
    },
    tableHeader: {
      backgroundColor: '#DCDCDC',
      justifyContent: 'space-evenly'
    },
    table1: {
        borderWidth: 1,
        borderColor: 'grey',
        height: 100
    },
    title: {
        fontWeight: 'bold',
    }
  });

export default Table