import React, {useState, useEffect} from "react"
import './styles.css'

function DevForm({onSubmit}){

    const[github_username, setGithunusername] = useState('');
    const[tech, setTechs] = useState('');
    const[latitude, setLatitude] = useState('');
    const[longitude, setLongitude] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            position => {
                const {latitude, longitude} = position.coords

                setLatitude(latitude)
                setLongitude(longitude)

                console.log(latitude, longitude);

            },
            err => {
                console.log(err)
            },
            {
                timeout: 30000,
            }
        )
    }, []);

    async function handleSubmit(e){
        e.preventDefault();

        const techs = tech.toLowerCase();

        await onSubmit({
            github_username,
            techs,
            latitude,
            longitude,
        });

        setGithunusername('');
        setTechs('');
    
    }
    
    return(

        <form onSubmit={handleSubmit}>
           <div className="input-block">
             <label htmlFor="github_username">Usuário do Git-Hub</label>
             <input 
              name="github_username" 
              id="github_username" 
              required 
              value={github_username}
              onChange={e => setGithunusername(e.target.value)}
             />              
           </div>

           <div className="input-block">
              <label htmlFor="techs">Tecnologias</label>
              <input 
              name="techs" 
              id="techs" 
              required 
              value={tech}
              onChange={   
                e => setTechs(e.target.value)
                } 
              />
           </div>

           <div className="input-group">
              <div className="input-block">
                  <label htmlFor="latitude">latitude</label>
                  <input 
                  type="number"
                  required 
                  name="latitude" 
                  id="latitude" 
                  value={latitude}
                  onChange={e => setLatitude(e.target.value)} 
                   />
              </div>

              <div className="input-block">
                  <label htmlFor="longitude">longitude</label>
                  <input 
                  type="number"
                  required 
                  name="longitude" 
                  id="longitude" 
                  value={longitude} 
                  onChange={e => setLongitude(e.target.value)} 
                   />
              </div>

           </div>

          <button type="submit">Salvar</button>
        </form>
    );
}

export default DevForm