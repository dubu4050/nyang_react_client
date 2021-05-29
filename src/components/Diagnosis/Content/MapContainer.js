/*global kakao*/
import { makeStyles } from '@material-ui/core';
import { AlertTitle } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';

const { kakao } = window;
let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

const MapContainer = ({ searchPlace }) => {
  const [flag, setFlag] = useState('True');
  useEffect(() => {
    const container = document.getElementById('myMap');
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 2,
    };
    const map = new kakao.maps.Map(container, options);

    const ps = new kakao.maps.services.Places();
    if (flag == 'True') {
      ps.keywordSearch('구미 동물병원', placesSearchCB);
      setFlag('False');
    } else {
      ps.keywordSearch(searchPlace + ' 동물병원', placesSearchCB);
    }

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        map.setBounds(bounds);
      }
    }

    function displayMarker(place) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });
    }
    // 지도에 마커를 표시하는 함수입니다
    function displayMarker(place) {
      // 마커를 생성하고 지도에 표시합니다
      var marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });

      // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(marker, 'click', function () {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        infowindow.setContent(
          '<div style="padding:5px;font-size:12px;">' +
            place.place_name +
            '</div>',
        );
        infowindow.open(map, marker);
      });
    }
  }, [searchPlace]);

  return <div id="myMap" style={{ width: '910px', height: '500px' }}></div>;
};

export default MapContainer;
