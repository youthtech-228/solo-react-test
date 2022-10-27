import React, { useState } from 'react';
import Select from '../../components/Select';
import Button from '../../components/Button';
import Input from '../../components/Input';
import AlertBox from '../../components/Alert';
import ApiService from '../../helper/api-services';
import States from './states';

const SELECT_OPTIONS = [
  { label: 'Representatives', value: 'representatives' },
  { label: 'Senators', value: 'senators' },
];

const STATE = 'UT';

export default function List() {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [dataList, setDataList] = useState([]);
  const [itemInfo, setItemInfo] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState({
    status: '',
    value: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setItemInfo(null);
    setDataList([]);
    let flag = false;
    if (selectedOption === '') {
      setAlert({
        status: 'Warning',
        value: 'Select Option'
      });
      flag = true;
    }
    if (selectedState === '') {
      setAlert({
        status: 'Warning',
        value: 'Select State'
      });
      flag = true;
    }
    console.log(flag);
    if(!flag) {
      setIsSubmitting(true);
      let res;
      if (selectedOption === 'representatives') {
        res = await ApiService.getRepresentativesByState(selectedState);
      } else {
        res = await ApiService.getSenatorsByState(selectedState);
      }
      if (res.success) {
        setDataList(res.results);
      } else {
        setAlert({
          status: 'Warning',
          value: 'Not display data'
        });
      }
      setIsSubmitting(false);
    }
  }

  const handleClickState = async (name) => {
    const info = dataList.filter((item) => item.name === name);
    setItemInfo(info?.[0]);
  }

  return (
    <div className='list-page-wrapper'>
      <h3 className='list-page-title'>Who's My Representative?</h3>
      <form onSubmit={handleSubmit}>
        <div className='list-page-actions-wrapper'>
          <Select options={SELECT_OPTIONS} onChange={(e) => setSelectedOption(e.target.value)} value={selectedOption} />
          <Select options={States} onChange={(e) => setSelectedState(e.target.value)} value={selectedState} />
          <Button type='submit' className='list-page-submit-button'>Submit</Button>
        </div>
      </form>
      <div className='list-page-content'>
        <div className='list-state-content col-8'>
          <div className='list-content-label'>List / <span>{selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1)}</span></div>
          <div className='list-state-content-rows'>
            <div className='list-state-content-row list-state-content-row-header'>
              <span className='col-name col-9'>Name</span>
              <span className='col-party col-3'>Party</span>
            </div>
            {dataList && dataList.length > 0 && dataList.map((item) => (
              <div 
                key={item.name} className={`list-state-content-row ${item.name === itemInfo?.name && 'list-state-content-active-row'}`} 
                onClick={() => handleClickState(item.name)} title='Click Row'
              >
                <span className='col-9'>{item.name || '-'}</span>
                <span className='col-3'>{item.party || '-'}</span>
              </div>
            ))}
          </div>
        </div>
        <div className='list-info-content col-4'>
          <div className='list-content-label'>Info</div>
          <div>
            <div className='info-input'><Input type='text' placeholder='First Name' value={itemInfo?.name?.split(' ')[0] || '-'} isDisabled/></div>
            <div className='info-input'><Input type='text' placeholder='Last Name' value={itemInfo?.name?.split(' ')[1] || '-'} isDisabled/></div>
            <div className='info-input'><Input type='text' placeholder='District' value={itemInfo?.district || '-'} isDisabled/></div>
            <div className='info-input'><Input type='text' placeholder='Phone' value={itemInfo?.phone || '-'} isDisabled/></div>
            <div className='info-input'><Input type='text' placeholder='Office' value={itemInfo?.office || '-'} isDisabled/></div>
          </div>
        </div>
      </div>
      {alert.value && (
        <div className='alert-wrapper'>
          <AlertBox value={alert.value} status={alert.status} onClose={() => setAlert({ value: '', status: '' })} />
        </div>
      )}
    </div>
  )
}