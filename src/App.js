import { useEffect, useState } from "react";


function App() {
  const [users, setUsers] = useState([])
  const [select, setSelect] = useState(null)

  const fetchData = async() => { 
  try{
    const res = await fetch('http://localhost:3001/users');
    const data = await res.json();
    console.log(data)
    setUsers(data)
    }catch(error){
      console.log(error)
    } 
  }

  const setFetchDate = async(people) => {
    const newData = {
      id : people.id,
      name : people.name,
      status : people.status
    }

    const res = await fetch(`http://localhost:3001/users/${people.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
        body: JSON.stringify(newData)
      })
      const data = await res.json();
      console.log(data)
      fetchData();
  }


  const passiveItem = () => {
    console.log('pasif btn çalıştı')
    const activeUserList = document.getElementById('active-user').getElementsByTagName('li')
    for(let i=0; i<activeUserList.length; i++){
        if(activeUserList[i].classList.contains('select')){
         
          const moveID = activeUserList[i].dataset.id;
      
          console.log(moveID)
          const changeData =  users.find(item => item.id == moveID )
          changeData.status = false
          console.log(changeData)
          console.log(users)
         setFetchDate(changeData)
         setSelect('')
        }       
    }
  }
  const activeItem = () => {
    console.log('active btn çalıştı')
    const activeUserList = document.getElementById('passive-user').getElementsByTagName('li')

    for(let i=0; i<activeUserList.length; i++){
        if(activeUserList[i].classList.contains('select')){
         
          const moveID = activeUserList[i].dataset.id;
      
          console.log(moveID)
          const changeData =  users.find(item => item.id == moveID )
          changeData.status = true
          console.log(changeData)
          console.log(users)
         setFetchDate(changeData)
         setSelect('')
        
        }       
    }
   
  }

  useEffect( () => {
    fetchData();
    
  },[])

  return (
    <main>
      <div className="container">
          <div className="user-list">
            <div className="list-box">
              <h3>Aktif Kullanıcılar</h3>
              <div className="underline"></div>
              <ul id="active-user">
                  {
                    users.map(item => {
                      if(item.status === true){
                        return(
                          <li key={item.id} 
                            data-id={item.id}
                            onClick={() => setSelect(item.id)}
                            className={ select == item.id && 'select' }
                          >
                            {item.name}
                          </li>
                        )
                      }
                    })
                  }
              </ul>
            </div>
            <div className="btns">
              <button className="btn" onClick={passiveItem}>Pasif Kullanıcı</button>
              <button className="btn" onClick={activeItem}>Aktif Kullanıcı</button>
            </div>
            <div className="list-box">
              <h3>Pasif Kullanıcılar</h3>
              <div className="underline"></div>
              <ul id="passive-user">
              {
                  users.map(item => {
                    if(item.status === false){
                      return(
                        <li key={item.id}
                        data-id={item.id}
                        onClick={() => setSelect(item.id)}
                        className={select == item.id && 'select'}
                        >
                          {item.name}
                        </li>
                      )
                    }
                  })
                }
            </ul>
            </div>            
          </div>
      </div>
      
    </main>
  );
}

export default App;
