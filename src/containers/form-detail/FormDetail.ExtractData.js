export const extractFeedbackData = (data) => {
  console.log('extractFeedbackData ' + JSON.stringify(data))
  const result =
    [
      {
        title: 'Basic Information',
        data: [
          {
            key: 'Status',
            value: data.basic_information.status,
          },
          {
            key: 'Date',
            value: data.basic_information.date,
          },
          {
            key: 'Reference No',
            value: data.basic_information.reference_no,
          }
        ]
      },
      {
        title: 'Feedback Information',
        data: [
          {
            key: 'Content',
            value: data.feedback_information.content,
          },
          {
            key: 'SubCategory',
            value: data.feedback_information.subcategory,
          },
          {
            key: 'Feedback ID',
            value: data.feedback_information.id,
          }
        ]
      }
    ]

  console.log('extractMovingData result ' + JSON.stringify(result))
  return result
}
