import React from 'react';

const Form = ({value, setValue, handleSubmit}) => {
  const handleChange = e => {
    setValue(e.target.value);
  };

  return (
    <form name="insert_frm" onSubmit={handleSubmit}>
      <input
        type="text"
        name="value"
        placeholder="추가할 목록 내용을 입력하세요"
        value={value}
        onChange={handleChange}
      />
      <button type="submit">add</button>
    </form>
  );
};

export default Form;
