import React from "react"
import { storiesOf } from "@storybook/react"
import ItsyDecorator from "../components/ItsyDecorator"

const stories = storiesOf("Tweetcarts", module)

stories.addDecorator(story => (
  <ItsyDecorator>{story()}</ItsyDecorator>
))

stories.add('lol', () => `

c={0,1,2,8,14,15,7}
function _draw()
 for w=3,68,.1 do
  a=4/w+t()/4
  k=145/w
  x=64+cos(a)*k
  y=64+sin(a)*k
  i=35/w+2+t()*3
  rect(x-w,y-w,x+w,y+w,f(i)*16+f(i+.5))
 end
end
function f(i)
 return c[flr(1.5+abs(6-i%12))]
end 

`)