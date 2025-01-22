import Button from '@mui/material/Button';
import Reset from '@mui/icons-material/Replay';
import Delete from '@mui/icons-material/Delete';
import Add from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';
import Box from '@mui/material/Box';

import maplibregl from 'maplibre-gl';
import { useFormContext } from 'react-hook-form';
import { useRef, useState, useEffect } from 'react';
import { NumberInput, useGetIdentity, useRecordContext } from 'react-admin';
import { Stops } from '../../../utils/types';

type entLatLngDetails = {
    id: string,
    latitude: number | null,
    longitude: number | null
}

export const CoordinatePicker = ({
    lat,
    lng,
    disabled,
    sourceLat,
    sourceLng
} : {
    lat?: number, 
    lng?: number,
    disabled?: boolean,
    sourceLat: string,
    sourceLng: string
}) => {
    const record = useRecordContext<Stops>();
    const map = useRef<maplibregl.Map | null>(null);
    const ocorrMarker = useRef<maplibregl.Marker | null>(null);
    const mapZoom = useRef<number>(17);
    const defaultLatLng = useRef<{lat: number | null, lng: number | null}>({
        lat: null,
        lng: null
    });
    const [innerLat, setLatitude] = useState<number>(0);
    const [innerLng, setLongitde] = useState<number>(0);
    const { identity, isLoading } = useGetIdentity();
    const { setValue, getValues, resetField, formState, reset } = useFormContext();
    //dados que se alterão consoante o input do user no form
    const data = getValues();

    function onClickMap (ev: maplibregl.MapMouseEvent & Object){

        if(!map.current || disabled) return;

        setValue(sourceLat, ev.lngLat.lat, {shouldDirty: true, shouldTouch: true});
        setValue(sourceLng, ev.lngLat.lng, {shouldDirty: true, shouldTouch: true});
        setLatitude(ev.lngLat.lat);
        setLongitde(ev.lngLat.lng);
        addMarker(ev.lngLat.lat, ev.lngLat.lng);

    }

    function onClickReset (){

        if(record && record.latitude && record.longitude) {

            setLatitude(record.latitude as number);
            setLongitde(record.longitude as number);
            resetField(sourceLat, {keepDirty: false, keepTouched: true});
            resetField(sourceLng, {keepDirty: false, keepTouched: true});
            addMarker(record.latitude as number, record.longitude as number);

            if(Object.keys(formState.dirtyFields).length===0){
                reset(undefined, {keepDirty: false});
            }

        } else {

            setLatitude(0);
            setLongitde(0);
            resetField(sourceLat, {keepDirty: false, keepTouched: false});
            resetField(sourceLng, {keepDirty: false, keepTouched: false});
            if(ocorrMarker.current) ocorrMarker.current.remove();

            //verifica se existe valores alterados para além da lat e lng
            //se não tiver queremos retirar o estado "dirty" do form
            if(Object.keys(formState.dirtyFields).length===0){
                reset(undefined, {keepDirty: false});
            }

        }
    }

    function onClickRemove (){

        if(record && record.latitude && record.longitude) {

            setLatitude(0);
            setLongitde(0);
            setValue(sourceLat, 0, {shouldDirty: true, shouldTouch: false});
            setValue(sourceLng, 0, {shouldDirty: true, shouldTouch: false});
            if(ocorrMarker.current) ocorrMarker.current.remove();

            if(Object.keys(formState.dirtyFields).length===0){
                reset(undefined, {keepDirty: false});
            }

        } else {

            setLatitude(0);
            setLongitde(0);
            resetField(sourceLat, {keepDirty: record.latitude ? true : false, keepTouched: false});
            resetField(sourceLng, {keepDirty: record.longitude ? true : false, keepTouched: false});
            if(ocorrMarker.current) ocorrMarker.current.remove();

            if(Object.keys(formState.dirtyFields).length===0){
                reset(undefined, {keepDirty: false});
            }

        }

    }

    async function initializeLocal(){

        if(data.latitude && data.longitude) {

            setLatitude(data.latitude);
            setLongitde(data.longitude);

        } else if(lat && lng){
            setLatitude(lat);
            setLongitde(lng);
        }

    }

    function addMarker(addLat?: number, addLng?: number){

        if(!map.current || disabled) return;

        if(ocorrMarker.current) ocorrMarker.current.remove();

        ocorrMarker.current = new maplibregl.Marker({
            color: "red",
            draggable: false
        }).setLngLat([addLng ? addLng : innerLng, addLat ? addLat : innerLat]).addTo(map.current);

        console.log(addLat);
        console.log(addLng);
        console.log(innerLat, innerLng);
    }

    function onZoomChange(){

        if(!map.current) return;

        mapZoom.current=map.current?.getZoom();
    }

    function addZoom(){

        if(!map.current) return;

        mapZoom.current=mapZoom.current+1;

        map.current.setZoom(mapZoom.current);

    }

    function removeZoom(){

        if(!map.current) return;

        mapZoom.current=mapZoom.current-1;

        map.current.setZoom(mapZoom.current);

    }

    useEffect(() => {
        console.log(data);
    }, [innerLat])

    useEffect(() => {
        if (map.current || isLoading) return;
        
        initializeLocal().then(() => {

            map.current = new maplibregl.Map({
                container: 'map',
                style: {
                    "version": 8,
                    "sources": {
                        "osm": {
                            "type": "raster",
                            "tiles": ["https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"],
                            "tileSize": 256,
                            "attribution": "&copy; OpenStreetMap Contributors"
                            //"maxzoom": 5,
                            //"minzoom": 10,
                        }
                    },
                    "layers": [
                        {
                          "id": "osm",
                          "type": "raster",
                          "source": "osm" // This must match the source key above
                        }
                    ]
                }, // stylesheet location
                center: [
                    defaultLatLng.current.lng ? defaultLatLng.current.lng : lng ? lng : -7.8536599, 
                    defaultLatLng.current.lat ? defaultLatLng.current.lat : lat ? lat : 39.557191
                ], // starting position [lng, lat]
                zoom: defaultLatLng.current.lat ? mapZoom.current : lat ? mapZoom.current : 6 // starting zoom,
            });
    
            map.current.on('click', onClickMap);
            map.current.on('zoomend', onZoomChange);

        });
            return () =>{
                if(map.current){
                    map.current.off('click', onClickMap); 
                    map.current.off('zoomend', onZoomChange);
            }
        }
    }, [isLoading]);

    useEffect(() => {

        if(!map.current || !record) return;

        if(innerLat===0 || record.latitude!==innerLat) return;

        console.log(data);
        addMarker(innerLat, innerLng);

        map.current.setCenter([innerLng, innerLat]);

        if(map.current.getZoom()<17){
            mapZoom.current = 17;
            map.current.setZoom(mapZoom.current);
        }
        console.log(innerLat);
        console.log(sourceLat);
    // eslint-disable-next-line
    }, [innerLat]);

    return(
        <>
        <Box display={{s: 'block', md: 'flex'}} sx={{flexWrap: {xs: 'none', md:'wrap'}}} >
            <Box flex={1} mr={{s: 0, md: '0.5em' }}>
                <NumberInput
                fullWidth 
                source={sourceLat} 
                label="resources.stop.fields.latitude"
                inputProps={{ readOnly: true }} 
                />
            </Box>
            <Box flex={1} ml={{s: 0, md: '0.5em' }}>
                <NumberInput
                source={sourceLng} 
                label="resources.stop.fields.longitude"
                fullWidth
                inputProps={{ readOnly: true }} 
                />             
            </Box>
        </Box>
        <div style={{width: '100%', height: '400px', position: 'relative'}} id="map" >
            <Box 
            sx={{
                position: 'absolute',
                zIndex: 3,
                top: 12,
                right: 12,
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                background: theme => theme.palette.background.default,
                padding: '8px',
                borderRadius: '10px'
            }}
            >
                <Button 
                variant='contained'
                sx={{
                    minWidth: 'auto',
                    width: '10px',
                    height: '30px',
                    '& span': {
                        margin: '0px'
                    }
                }}
                disabled={innerLat===(record && record.latitude ? record.latitude : 0) && innerLng===(record && record.longitude ? record.longitude : 0) ? true : disabled ? disabled : false}
                onClick={onClickReset}
                >
                    <Reset/>
                </Button>
                <Button 
                variant='contained'
                sx={{
                    minWidth: 'auto',
                    width: '10px',
                    height: '30px',
                    '& span': {
                        margin: '0px'
                    }
                }}
                disabled={(innerLat===0 && innerLng===0) || (!record || (record && !record.latitude && !record.latitude)) ? true : disabled ? disabled : false}
                onClick={onClickRemove}
                >
                    <Delete/>
                </Button> 
            </Box>
            <Box 
            sx={{
                position: 'absolute',
                zIndex: 3,
                bottom: 40,
                right: 12,
                display: 'flex',
                flexDirection: 'column',
                gap: '5px',
                background: theme => theme.palette.background.default,
                padding: '8px',
                borderRadius: '10px'
            }}
            >
                <Button 
                variant='contained'
                sx={{
                    minWidth: 'auto',
                    width: '10px',
                    height: '30px',
                    '& span': {
                        margin: '0px'
                    }
                }} 
                onClick={() => addZoom()}
                >
                    <Add/>
                </Button>
                <Button 
                variant='contained'
                sx={{
                    minWidth: 'auto',
                    width: '10px',
                    height: '30px',
                    '& span': {
                        margin: '0px'
                    }
                }}
                onClick={() => removeZoom()}
                >
                    <Remove/>
                </Button> 
            </Box>
        </div>
    </>
    )
}