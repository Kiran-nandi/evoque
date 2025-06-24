import React, {useEffect, useState, useMemo, useRef, forwardRef, useImperativeHandle} from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPenToSquare, faPen } from "@fortawesome/free-solid-svg-icons";
import { sampledata } from '../components/Sampledata';

import { AgGridReact } from "@ag-grid-community/react";
  import "@ag-grid-community/styles/ag-grid.css";
  import "@ag-grid-community/styles/ag-theme-quartz.css";
  import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
  import { ModuleRegistry } from "@ag-grid-community/core";
  import { CsvExportModule } from '@ag-grid-community/csv-export';

  ModuleRegistry.registerModules([ClientSideRowModelModule, CsvExportModule]);


const AllBookings = forwardRef((props, ref) => {
    const [leadsearchtext, setleadsearchtext] = useState("");
    const [destination, setdestination] = useState("");
    const [travelmonth, settravelmonth] = useState("");
    const [sortby, setsortby] = useState("");
    const [accmanager, setaccmanager] = useState("");
    const [agenttext, setagenttext] = useState("");
    const [tripstatus, settripstatus] = useState("");

    const gridRef = useRef();

    const paginationPageSizeSelector = useMemo(() => {
        return [10, 20, 50, 100];
      }, []);
      const [rowData, setRowData] = useState([]);
      const [colDefs, setColDefs] = useState();

      const defaultColDef = {
        flex: 1,
        wrapText: true,          // allows wrapping in cells
  autoHeight: true,        // automatically adjusts row height
  resizable: true,         // optional
  sortable: true,          // optional
  filter: false,            // optional
  cellStyle: {             // ensures padding and wrapping
    whiteSpace: 'normal',
    wordBreak: 'normal',  
    lineHeight: '1.5',
    padding: '6px',
    fontSize: '11px',
    fontWeight: 500
  },
  headerClass: 'ag-header-wrap-text',  // enables multi-line headers
      };

      const handleviewdetails = () => {
        console.log('test >>');
      }


    const fetchalldata = () => {
        var prevdata = sampledata;
        if(prevdata?.length > 0) {
            var columnsarr = [];
            var hidecolumns = [];
            var hidefilters = [];
            var columns = Object.keys(prevdata[0]);
            for(var i = 0; i < columns?.length;i++) {
              if(!hidecolumns.includes(columns[i])) {
                var obj = {};
                obj.field = columns[i];
                    obj.cellStyle = { color: "#000", fontWeight: 600 };
                    if (!hidefilters.includes(columns[i])) {
                      obj.cellClass = 'inventorycell';
                      obj.filter = false;
                      obj.autoHeight = true;
                      // obj.maxWidth = 100
                      obj.wrapText = true;
                      obj.filterParams = {
                        filterOptions: ["contains"],
                        maxNumConditions: 1,
                      };
                    }
                if(columns[i] == "tripStatus") {
                  
                    obj.cellRenderer = (props) => {
                      return (
                        <div className='tripstatusbtndiv'>
                          <div className='confirmedbtn' style={
                            props?.data?.tripStatus == 'Confirmed' ? {backgroundColor: '#778be7'} :
                            props?.data?.tripStatus == 'Cancelled' ? {backgroundColor: '#ff6b6c'} :
                            props?.data?.tripStatus == 'On Tour' ? {backgroundColor: '#ffe17c'} :
                            {}
                          }>
                            <p>{props?.data?.tripStatus}</p>
                          </div>
                        </div>
                        
                      )
                      
                    }
                }
                else if(columns[i] == "bookingStatus") {
                  
                    obj.cellRenderer = (props) => {
                      return (
                        <div className='tripstatusbtndiv'>
                          {
                            props?.data?.bookingStatus == "success" ?
                            <div className='greendot'></div> :
                            <div className='greendot bluedot'></div>
                          }
                          
                        </div>
                        
                      )
                      
                    }
                }
                else if(columns[i] == "vouchers") {
                  
                    obj.cellRenderer = (props) => {
                      return (
                        <div className='tripstatusbtndiv'>
                          {
                            props?.data?.vouchers == "success" ?
                            <div className='greendot'></div> :
                            <p className='vouchertext'>{ props?.data?.vouchers}</p>
                          }
                          
                        </div>
                        
                      )
                      
                    }
                }
                else {
                  
                }

                    columnsarr.push(obj);
                  
              }
            }

            //action
            var actionobj = 
            {
              field: "action",
              headerName: "Action",
              suppressExcelExport: true,
              suppressCsvExport: true,
              cellRenderer: (props) => {
              // console.log('props >>', props?.data)
                return (
                  <div className="d-flex">
                      <div className='actioneditbtn'>
                        <FontAwesomeIcon icon={faPen} className='editicon' />
                      </div>
                  </div>
                )
              },
            }
            columnsarr.push(actionobj);
      
      
            setColDefs(columnsarr);
            setRowData(prevdata);
      
            
      
        }
    }

    useImperativeHandle(ref, () => ({
      triggerChildFunction() {
        // Your logic here
        gridRef.current.api.exportDataAsCsv({
          fileName: 'allbookings-export.csv',
          columnSeparator: ',',
        });
      },
    }));

    useEffect(() => {
        fetchalldata();
    }, [])
 
    return (
      <div className="">
        <div className="filterdropdownsdiv d-flex">
            {/* Lead pax search */}
          <div className="searchdiv">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="navbaricon" />
            <input
              value={leadsearchtext} onChange={(t) => {setleadsearchtext(t.target.value)}}
              className="form-control filterdivinput"
              placeholder="Lead pax/Trap id"
            />
          </div>

          {/* Destination */}
          <div className="searchdiv">
            <select className='form-control filterdivinput filterdivselect' value={destination} onChange={(t) => {setdestination(t.target.value)}}>
                <option value={""} disabled>Select Destination</option>
                <option value={"Singapore"}>Singapore</option>
                <option value={"Malaysia"}>Malaysia</option>
                <option value={"China"}>China</option>
            </select>
          </div>

          {/* Travel Month */}
          <div className="searchdiv">
            <select className='form-control filterdivinput filterdivselect' value={travelmonth} onChange={(t) => {settravelmonth(t.target.value)}}>
                <option value={""} disabled>Select Month</option>
                <option value={"June"}>June</option>
                <option value={"July"}>July</option>
                <option value={"August"}>August</option>
            </select>
          </div>

          {/* Sort by */}
          <div className="searchdiv">
            <select className='form-control filterdivinput filterdivselect' value={sortby} onChange={(t) => {setsortby(t.target.value)}}>
                <option value={""} disabled>Sort By</option>
                <option value={"Month"}>Month</option>
                <option value={"Arrival"}>Arrival</option>
                <option value={"Departure"}>Departure</option>
            </select>
          </div>

          {/* Acc. Manager */}
          <div className="searchdiv">
            <select className='form-control filterdivinput filterdivselect' value={accmanager} onChange={(t) => {setaccmanager(t.target.value)}}>
                <option value={""} disabled>Select Acc. Manager</option>
                <option value={"Pratiksha"}>Pratiksha</option>
                <option value={"Kiran"}>Kiran</option>
            </select>
          </div>

          {/* Agent Text */}
          <div className="searchdiv">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="navbaricon" />
            <input
              value={agenttext} onChange={(t) => {setagenttext(t.target.value)}}
              className="form-control filterdivinput"
              placeholder="Agent"
            />
          </div>

          {/* Trip Status */}
          <div className="searchdiv">
            <select className='form-control filterdivinput filterdivselect' value={tripstatus} onChange={(t) => {settripstatus(t.target.value)}}>
                <option value={""} disabled>Select Trip Status</option>
                <option value={"Travelled"}>Travelled</option>
                <option value={"Confirmed"}>Confirmed</option>
                <option value={"Cancelled"}>Cancelled</option>
                <option value={"On Tour"}>On Tour</option>
            </select>
          </div>

          {/* Apply Button */}
          <div className="searchdiv">
            <div className='applybtndiv'>
                <p>Apply</p>
            </div>
          </div>


        </div>

        {/* Ag Grid Table */}
        <div
            className={"ag-theme-quartz custom-theme-quartz mt-4"}
            style={{ width: "100%", minHeight: 550 }}
          >
            <AgGridReact
              // modules={AllModules}
              ref={gridRef}
              rowData={rowData}
              columnDefs={colDefs}
              defaultColDef={defaultColDef}
              suppressRowClickSelection={true}
              groupSelectsChildren={true}
              rowSelection={"multiple"}
              pagination={true}
              paginationPageSize={10}
              paginationPageSizeSelector={paginationPageSizeSelector}
              rowHeight={60}
              headerHeight={65}
              domLayout="autoHeight"
              // onGridReady={onGridReady}
            />
          </div>
      </div>
    );
});

export default AllBookings