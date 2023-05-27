import React, {useEffect, useState} from "react";
import { AgGridReact } from "ag-grid-react";
import ReactAudioPlayer from "react-audio-player";

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

export function PodcastGrid(props){
    const  [rowData, setRowData] = useState();
    const [gridApi, setGridApi] = useState();
    var columnDefs = [
        {
            headerName: 'Episode Title',
            field: 'title',
            wrapText: true,
            autoHeight: true,
            flex: 2,
            resizable: true,
            filter: 'agGridTextFilter'
        },
        {
            headerName: 'Published',
            field: 'pubDate',
            sortable: true,
            filter: 'agDateColumnFilter'
        },{
            field:'description',
            hide : true
        },
        {
            headerName: 'Episode',
            field: 'mp3',
            flex: 2,
            cellRenderer: (params) => (
                <ReactAudioPlayer
                  src={params.value}
                  controls
                  style={{ height: "2em", verticalAlign: "middle" }}
                />
           
        )}
    ]
    useEffect(()=>{
        fetch(props.rssfeed).
        then(response => response.text()).
        then(str=>{
            const parser = new window.DOMParser();
            const data = parser.parseFromString(str, 'text/xml');
            const itemList = data.querySelectorAll('item');
            const items=[];
            itemList.forEach(el => {
                items.push({
                    title: el.querySelector('title').innerHTML,
                    pubDate: new Date(el.querySelector('pubDate').textContent),
                    mp3: el.querySelector('enclosure').getAttribute('url'),
                    description: el.querySelector('description').
                            textContent.replace(/(<([^>]+)>)/gi,'')
            })
        })
        setRowData(items);
    })
},[props.rssfeed]);
    const onGridReady = (param) => {
        setGridApi(param.api);
    }  
    useEffect(()=>{
        if(gridApi){
            gridApi.setQuickFilter(props.quickFilter);
        }
    }, [gridApi, props.quickFilter])
    return(<div className="ag-theme-alpine" 
    style={{height: props.height, width : props.width}}>
    <AgGridReact
        onGridReady={onGridReady}
        rowData={rowData}
        columnDefs = {columnDefs}
        pagination = {true}
        paginationAutoPageSize = {true}
    >
    </AgGridReact>
    </div>
    )
}
