import { useEffect, useRef} from "react"
import {useState} from 'react';

const Gamepieces = ({score,setScore,onGameOver}) => {
    const canvasRef = useRef();
    const snake_speed = 10;
    const [apple, setApple] = useState({ x: 180, y: 100 })
    const [snake, setSnake] = useState([{ x: 100, y: 50 },{ x: 90, y: 50 }])
    const [direction, setDirection] = useState(null)
    const r=5
    

    useEffect(()=>{
        const canvas=canvasRef.current
        console.log(canvasRef.current)
        const ctx=canvas.getContext("2d")

        const drawsnake=()=>{
            snake.forEach((snakepath)=>{
                ctx.beginPath()
                ctx.rect(snakepath.x,snakepath.y,20,20)
                ctx.fillStyle="#212121"
                ctx.fill()
                ctx.closePath()
            })
        }


        const drawapple=()=>{
           
                ctx.beginPath()
                ctx.arc(apple.x + r, apple.y + r, r, 0, 2 * Math.PI);
                ctx.fillStyle="#ED2939"
                ctx.fill()
                ctx.closePath()     
        }


        const interval=setInterval(()=>{
            ctx.clearRect(0,0,canvas.width,canvas.height)
            drawsnake()
            drawapple()
            moveSnake()
        },100)



       





        const moveSnake=()=>{
            if(direction)
            {
                setSnake((prevSnake)=>{
                    const newsnake=[...prevSnake]
                    const snakehead={x:newsnake[0].x , y:newsnake[0].y};

                    for(let i=newsnake.length-1;i>0;i--)
                    {
                        newsnake[i].x=newsnake[i-1].x
                        newsnake[i].y=newsnake[i-1].y
                    }

                    switch(direction)
                    {
                        case "right":
                        snakehead.x+=snake_speed
                        break;
                        case "left":
                            snakehead.x-=snake_speed
                        break
                        case "up":
                            snakehead.y-=snake_speed
                        break
                        case "down":
                            snakehead.y+=snake_speed
                        break

                    }
                    newsnake[0]=snakehead;
                    handleapplecollision(newsnake)
                    bordercollision(newsnake)
                    selfbitecollision(newsnake)
                   

                    return newsnake
                })
            }
        }





        const selfbitecollision=(newsnake)=>{
            const snakehead=newsnake[0]
           for(let i=1;i<newsnake.length-1;i++)
           {
            if(snakehead.x===newsnake[i].x && snakehead.y===newsnake[i].y)

                {
                    onGameOver("self-bite")
                }

           }
            
        }



        const bordercollision=(newsnake)=>{
            const snakehead=newsnake[0]
            if(snakehead.x>canvas.width || snakehead.x<0 || snakehead.y>canvas.height || snakehead.y<0 ) 
            {
              onGameOver("wall")
            }
        }



        const handleapplecollision=(newsnake)=>{

            const snakehead =newsnake[0]

            if(snakehead.x===apple.x && snakehead.y===apple.y)
            {
                setScore(prevScore => prevScore + 1)

                setApple({
                    x:Math.floor((Math.random()*canvas.width)/snake_speed)*snake_speed,
                    y:Math.floor((Math.random()*canvas.height)/snake_speed)*snake_speed
                })
                console.log(apple.x,apple.y)

                newsnake.push({
                    x:newsnake[newsnake.length-1].x,
                    y:newsnake[newsnake.length-1].y
                })
            }

            
        }
        
        const handlekeypress=(e)=>{
            switch(e.key)
            {
                case "ArrowRight":
                {
                    setDirection("right")
                    break;
                }
                case "ArrowLeft":
                {
                    setDirection("left")

                     break;
                }
                case "ArrowUp":
                {
                    setDirection("up")
                     break;
                }
                case "ArrowDown":
                {
                    setDirection("down")
                     break;
                }
                default:
                    break;
            }

        }

        window.addEventListener("keydown",handlekeypress)




      

        return()=>{
            clearInterval(interval)
        }
      

    },[snake,direction])

    return (
        <div className="flex items-center justify-center">
            <canvas className="gamecanvas" ref={canvasRef} width={750} height={500}>

            </canvas>

        </div>


    )

}
export default Gamepieces