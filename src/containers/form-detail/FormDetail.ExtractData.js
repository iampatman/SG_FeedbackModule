export const extractMovingData = (data) => {
  console.log('extractMovingData ' + JSON.stringify(data))
  const result =
    [
      {
        title: 'Basic Information',
        data: [
          {
            key: 'Form No',
            value: data.basic_information.form_no,
          },
          {
            key: 'Submission Date',
            value: data.basic_information.submit_date,
          },
          {
            key: 'Status',
            value: data.basic_information.state,
          },
          {
            key: 'Check Number',
            value: data.basic_information.check_no,
          },
          {
            key: 'Moving Date',
            value: data.basic_information.moving_date,
          },
          {
            key: 'Moving Situation',
            value: data.basic_information.type,
          },
          {
            key: 'Unit No',
            value: data.basic_information.unit_no,
          }
          ,
          {
            key: 'Deposit',
            value: data.basic_information.deposit,
          }
        ]
      },
      {
        title: 'Owner Information',
        data: [
          {
            key: 'Email',
            value: data.owner_information.email,
          },
          {
            key: 'Name',
            value: data.owner_information.name,
          },
          {
            key: 'Mobile No',
            value: data.owner_information.mobile_no,
          }
        ]
      },
      {
        title: 'Mover Information',
        data: [
          {
            key: 'Mover Phone No',
            value: data.mover_information.mover_phno,
          },
          {
            key: 'Mover Name',
            value: data.mover_information.mover_name,
          }, {
            key: 'Vehicle Type',
            value: data.mover_information.vehicle_type,
          }, {
            key: 'Mover Email',
            value: data.mover_information.mover_email,
          },
        ]
      },
    ]

  console.log('extractMovingData result ' + JSON.stringify(result))
  return result
}

export const extractRentalData = (data) => {
  console.log('extractRentalData ' + JSON.stringify(data))
  const result =
    [
      {
        title: 'Basic Information',
        data: [
          {
            key: 'Form No',
            value: data.basic_information.form_no,
          },
          {
            key: 'Submission Date',
            value: data.basic_information.submitted_date,
          },
          {
            key: 'Terminated Date',
            value: data.basic_information.terminated_date,
          },
          {
            key: 'Status',
            value: data.basic_information.state,
          },
          {
            key: 'Check Number',
            value: data.basic_information.check_no,
          },
          {
            key: 'Tenancy Start Date',
            value: data.basic_information.tenancy_start_date,
          },
          {
            key: 'Tenancy End Date',
            value: data.basic_information.tenancy_end_date,
          },
          {
            key: 'Tenant Type',
            value: data.basic_information.type,
          },
          {
            key: 'Unit No',
            value: data.basic_information.unit_no,
          }
          ,
          {
            key: 'Deposit',
            value: data.basic_information.deposit,
          }
        ]
      },
      {
        title: 'Owner Information',
        data: [
          {
            key: 'Email',
            value: data.owner_information.email,
          },
          {
            key: 'Name',
            value: data.owner_information.name,
          },
          {
            key: 'Mobile No',
            value: data.owner_information.mobile,
          }
        ]
      }
    ]

  console.log('extractMovingData result ' + JSON.stringify(result))
  return result
}

export const extractRenovationData = (data) => {
  console.log('extractRenovationData ' + JSON.stringify(data))
  const result =
    [
      {
        title: 'Basic Information',
        data: [
          {
            key: 'Form No',
            value: data.basic_information.form_no,
          },
          {
            key: 'Submission Date',
            value: data.basic_information.submit_date,
          },
          {
            key: 'Rejected Date',
            value: data.basic_information.rejected_date,
          },
          {
            key: 'Commence Date',
            value: data.basic_information.commence_date,
          },
          {
            key: 'Complete Date',
            value: data.basic_information.completed_date,
          },
          {
            key: 'Status',
            value: data.basic_information.state,
          },
          {
            key: 'Renovation Type',
            value: data.basic_information.type,
          },
          {
            key: 'Unit No',
            value: data.basic_information.unit_no,
          }
          ,
          {
            key: 'Deposit',
            value: data.basic_information.deposit,
          }
        ]
      },
      {
        title: 'Owner Information',
        data: [
          {
            key: 'Email',
            value: data.owner_information.email,
          },
          {
            key: 'Name',
            value: data.owner_information.name,
          },
          {
            key: 'Mobile No',
            value: data.owner_information.mobile_no,
          }
        ]
      },
      {
        title: 'Mover Information',
        data: [
          {
            key: 'Mover Phone No',
            value: data.mover_information.mover_phno,
          },
          {
            key: 'Mover Name',
            value: data.mover_information.mover_name,
          }, {
            key: 'Vehicle Type',
            value: data.mover_information.vehicle_type,
          }, {
            key: 'Mover Email',
            value: data.mover_information.mover_email,
          },
        ]
      },
    ]

  console.log('extractMovingData result ' + JSON.stringify(result))
  return result
}

export const extractVehicleData = (data) => {
  console.log('extractVehicleData ' + JSON.stringify(data))
  const result =
    [
      {
        title: 'Basic Information',
        data: [
          {
            key: 'Form No',
            value: data.basic_information.form_no,
          },
          {
            key: 'Submission Date',
            value: data.basic_information.submit_date,
          },
          {
            key: 'Reject Date',
            value: data.basic_information.rejected_date,
          },
          {
            key: 'Status',
            value: data.basic_information.state,
          },
          {
            key: 'Check Number',
            value: data.basic_information.check_no,
          },
          {
            key: 'Vehicle Type',
            value: data.basic_information.type,
          },
          {
            key: 'Unit No',
            value: data.basic_information.unit_no,
          }
          ,
          {
            key: 'Deposit',
            value: data.basic_information.deposit,
          }
        ]
      },
      {
        title: 'Owner Information',
        data: [
          {
            key: 'Email',
            value: data.owner_information.email,
          },
          {
            key: 'Name',
            value: data.owner_information.name,
          },
          {
            key: 'Mobile No',
            value: data.owner_information.mobile,
          }
        ]
      },

      {
        title: 'Car Information',
        data: [
          {
            key: 'Usage Start Date',
            value: data.car_information.usage_start_date,
          }, {
            key: 'Usage End Date',
            value: data.car_information.usage_end_date,
          }, {
            key: 'Type',
            value: data.car_information.type,
          }, {
            key: 'Vehicle No',
            value: data.car_information.vehicle_no,
          },
        ]
      }
    ]

  console.log('extractMovingData result ' + JSON.stringify(result))
  return result
}

export const extractRefundData = (data) => {
  const result =
    [
      {
        title: 'Basic Information',
        data: [
          {
            key: 'Form No',
            value: data.basic_information.form_no,
          },
          {
            key: 'Submission Date',
            value: data.basic_information.submit_date,
          },
          {
            key: 'Reject Date',
            value: data.basic_information.rejected_date,
          },
          {
            key: 'Status',
            value: data.basic_information.state,
          },
          {
            key: 'Check Number',
            value: data.basic_information.check_no,
          }
          ,
          {
            key: 'Deposit',
            value: data.basic_information.deposit,
          }
        ]
      },
      {
        title: 'Refund Information',
        data: [
          {
            key: 'Bank',
            value: data.refund_information.bank,
          },
          {
            key: 'Account Name',
            value: data.refund_information.account_name,
          },
          {
            key: 'Account No',
            value: data.refund_information.account_no,
          }
          ,
          {
            key: 'Amount',
            value: data.refund_information.amount,
          }
        ]
      }
    ]
  return result
}

export const extractOtherInformation = ({other_information}) => {
  var data = []
  if (other_information != null && other_information.length > 0) {
    other_information.forEach((fileInfo) => {
      data.push({
        key: 'Attached File',
        value: fileInfo.name,
        url: fileInfo.url
      })
    })
  } else {
    return null
  }
  const result = {
    title: 'Other Information',
    data
  }

  return result

}