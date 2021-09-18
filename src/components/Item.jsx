import { useContext, useEffect } from "react";
import { ThemeContext } from "../App";

const Item = ({ item, setItems }) => {
  /* ====== DELETE ITEM ====== */ // Deletes an item
  const deleteItem = (item) => {
    // Sets state
    setItems((prevItems) => prevItems.filter((prevItem) => prevItem !== item));
  };

  const updateItem = (item, itemProp) => {
    // Sets state
    setItems((prevItems) => {
      return (prevItems = prevItems.map((prevItem) =>
        prevItem === item
          ? (prevItem = { ...prevItem, edit: itemProp })
          : prevItem
      ));
    });
  };

  useEffect(() => {
    document.querySelector(`.item-${item._id} .${item.edit}Wrap input`) &&
      document
        .querySelector(`.item-${item._id} .${item.edit}Wrap input`)
        .focus();
  }, [item._id, item.edit]);

  const { darkTheme } = useContext(ThemeContext);
  return (
    <div className={`item item-${item._id} ${darkTheme && "bg-dark"}`}>
      <button
        className='btn btn-danger delete pb-1'
        onClick={() => deleteItem(item)}>
        <span>&times;</span>
      </button>
      <div className='titleWrap'>
        {item.edit === "title" ? (
          <input
            type='text'
            defaultValue={item.title}
            onBlur={(e) => {
              // Sets state
              setItems((prevItems) => {
                return prevItems.map((prevItem) => {
                  if (prevItem === item) {
                    prevItem = {
                      ...prevItem,
                      title: e.target.value,
                      edit: "none",
                    };
                  }
                  return prevItem;
                });
              });
            }}
            onKeyUp={(e) => {
              if (e.code === "Enter") {
                // Sets state
                setItems((prevItems) => {
                  return prevItems.map((prevItem) => {
                    if (prevItem === item) {
                      prevItem = {
                        ...prevItem,
                        title: e.target.value,
                        edit: "none",
                      };
                    }
                    return prevItem;
                  });
                });
              }
            }}></input>
        ) : (
          <h4 className={darkTheme ? "text-light" : "text-dark"}>
            {item.title}
          </h4>
        )}
        <button
          className='btn btn-sm'
          onClick={() => updateItem(item, "title")}>
          Edit
        </button>
      </div>
      <div className='textWrap'>
        {item.edit === "text" ? (
          <input
            type='text'
            defaultValue={item.text}
            onBlur={(e) => {
              setItems((prevItems) => {
                return prevItems.map((prevItem) => {
                  if (prevItem === item) {
                    prevItem = {
                      ...prevItem,
                      text: e.target.value,
                      edit: "none",
                    };
                  }
                  return prevItem;
                });
              });
            }}
            onKeyUp={(e) => {
              if (e.code === "Enter") {
                // Sets state
                setItems((prevItems) => {
                  return prevItems.map((prevItem) => {
                    if (prevItem === item) {
                      prevItem = {
                        ...prevItem,
                        text: e.target.value,
                        edit: "none",
                      };
                    }
                    return prevItem;
                  });
                });
              }
            }}></input>
        ) : (
          <p className={darkTheme ? "text-light" : "text-dark"}>{item.text}</p>
        )}
        <button className='btn btn-sm' onClick={() => updateItem(item, "text")}>
          Edit
        </button>
      </div>
    </div>
  );
};

export default Item;
