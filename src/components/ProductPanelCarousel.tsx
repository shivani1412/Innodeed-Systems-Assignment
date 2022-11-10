import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore
import { Block, Button, View, SelectInput, Flex } from 'vcc-ui';
import ProductPanel from "../components/ProductPanel";
import { ItemProps, TrackingProps } from '../types/types';
import NavigationControl from "./NavigationControl";
import { CONSTANT } from "../constants/constants";
import { stringify } from 'querystring';


export default function ProductPanelCarousel() {
    const [carData, setCarData] = useState<ItemProps[]>([]);
    const [savedData, setSavedData] = useState<ItemProps[]>([]);
    const [containerWidth, setContainerWidth] = useState('');
    const [navigation, setNavigation] = useState('');
    const [isForward, setIsForward] = useState(false);
    const [isBackward, setIsBackward] = useState(false);
    const [isFilter, setIsFilter] = useState(false);
    let [counter, setCounter] = useState(0);
    const [totalGroups, setTotalGroups] = useState(0);
    const [filterValue, setFilterValue] = useState('');
    const [totalItems, setTotalItems] = useState([]);

    const movePanel = (direction: number) => { // direction value determines panel direction
        direction === 0 ? setCounter(counter--) : setCounter(counter++) ;
        checkNavigation();
        // 0: backwards, 1: forwards
        const panelDirection = direction ? (parseInt(navigation) - parseInt(containerWidth)) : (navigation + containerWidth)
        setNavigation(stringify.arguments(panelDirection));
    }

    const checkNavigation = () => { // checks if navigation should be disabled
        counter <= 0 ? setIsBackward(false) : setIsBackward(true);
        counter >= totalGroups ? setIsForward(false) : setIsForward(true);
    }

    const calculateGroupTotal = () => {
        // TODO: total to calculate when navigation has hit a boundary
        // const total = Math.ceil(carData.length / CONSTANT.groupedItems);
        setTotalGroups(1);
        checkNavigation();
    }

    const ref = useRef(null);

    const positionStyle = () => { // creates the scroll effect
        return {
            left: navigation + 'px',
            position: 'relative' as 'relative'
        }
    };

    const setCurrentWidth = () => { // used to calculate how much the carousel should scroll
        // @ts-ignore
        let currentWidth = ref.current ? ref.current.offsetWidth : 0;
        setNavigation('0');
        setContainerWidth(currentWidth);
        calculateGroupTotal();
    }

    window.addEventListener('resize', setCurrentWidth);

    useEffect(() => { // calls api
        fetch(CONSTANT.url)
            .then(response => response.json())
            .then(data => {
                setCarData(data);
                setSavedData(data);
                const arr = Array.from({length:data.length},()=> ({'active':false}));
                arr[0].active = true;
                setTotalItems(arr);
            })
    }, []);

    useEffect(() => { // sets current element width
        setCurrentWidth();
    }, [ref.current]);

    useEffect(() => { // Calculates how many item groups exist for navigation puroses
        calculateGroupTotal();
    }, [carData]);

    useEffect(() => { // Call for cars to be filtered by value
        filterCars();
    }, [filterValue]);

    const filterCars = () => {
        if (filterValue !== '') {
            setIsFilter(true);
            setNavigation('0');
        }
        const filteredCars = carData.filter(item => item.bodyType === filterValue);
        setCarData(filteredCars);
    }

    const resetCars = () => {
        setCarData(savedData);
        setNavigation('0');
        setIsFilter(false);
    }

  return (<>
      <Block>
          <div className="filterPanel">
              <label htmlFor="filter">Filter by body type</label>
              <SelectInput id="filter" disabled={isFilter} value={filterValue} onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setFilterValue(e.target.value)}>
                  <option value="suv">SUV</option>
                  <option value="estate">ESTATE</option>
                  <option value="sedan">SEDAN</option>
              </SelectInput>
              <Button intent="secondary" onClick={() => resetCars ()}>Reset</Button>
          </div>
        <div ref={ref} className="productPanelWrapper">
            <Block>
                <div style={positionStyle()} className="productPanelContainer">
                  {carData &&
                      carData.map((item:ItemProps) => {
                          return (<>
                              <ProductPanel
                                  id={item.id}
                                  bodyType={item.bodyType}
                                  modelName={item.modelName}
                                  modelType={item.modelType}
                                  imageUrl={item.imageUrl}
                              />
                          </>)
                      })
                  }
                </div>
            </Block>
            {!isFilter && <NavigationControl fnc={movePanel} forward={!isForward} backward={!isBackward} />}
        </div>
          <div className="tracking">
              {totalItems &&
              totalItems.map((item:TrackingProps) => {
                  return (<div className={item.active ? 'tracker active' : 'tracker'} />)
              })
              }
          </div>
      </Block>
      </>
  );
}