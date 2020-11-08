import React, { useState, useEffect } from "react";
import {
  ReactPictureAnnotation,
  defaultShapeStyle,
  DefaultInputSection
} from "react-picture-annotation";
import './CaseImage.scss'


const CaseImage = ({imageItem, onAnnotaionChange, disabled}) => {

  const [annotationData, setAnnotationData] = useState([])

  useEffect(()=> {
    setAnnotationData(imageItem.data);

  }, [imageItem])



  const onSelect = selectedId => console.log('SELECR',selectedId);
  const onChange = data => {
    if(disabled) return;
    console.log('ANNOTATION DATA =>', data)
    setAnnotationData(data)
    if(JSON.stringify(annotationData) !== JSON.stringify(data)){
      onAnnotaionChange({
        imgUrl: imageItem.imgUrl,
        data
    })
    }
    
  }
console.log('CASE IMAGE PROPS =>', imageItem)
  return (
    <span>
      <ReactPictureAnnotation
        image={imageItem.imgUrl}
        onSelect={onSelect}
        onChange={onChange}
        disabled
        width={300}
        height={300}
        // height={pageSize.height}
        annotationStyle={{
          ...defaultShapeStyle,
          shapeStrokeStyle: "#2193ff",
          transformerBackground: "black"
        }}
        annotationData={annotationData}
        inputElement={(value, onChange, onDelete) => (
          <DefaultInputSection
            placeholder={"Comment Here..."}
            {...{ value, onChange, onDelete }}
          />
        )}
      />
      </span>
  );
};
export default CaseImage;
