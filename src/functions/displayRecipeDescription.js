export default function displayRecipeDescription(d) {
  return (
    <div>
    <span style={{opacity: 1}}>{d.substring(0,50)}</span>
    <span style={{opacity: .9, fontSize: ".95em"}}>{d.substring(50,60)}</span>
    <span style={{opacity: .8, fontSize: ".9em"}}>{d.substring(60,70)}</span>
    <span style={{opacity: .7, fontSize: ".85em"}}>{d.substring(70,80)}</span>
    <span style={{opacity: .6, fontSize: ".8em"}}>{d.substring(80,90)}</span>
    <span style={{opacity: .5, fontSize: ".75em"}}>{d.substring(90,100)}</span>
    <span style={{opacity: .45, fontSize: ".7em"}}>{d.substring(100,110)}</span>
    <span style={{opacity: .4, fontSize: ".65em"}}>{d.substring(110,120)}</span>
    <span style={{opacity: .36, fontSize: ".6em"}}>{d.substring(120,130)}</span>
    <span style={{opacity: .33, fontSize: ".6em"}}>{d.substring(130,140)}</span>
    <span style={{opacity: .3, fontSize: ".6em"}}>{d.substring(140,150)}</span>
    <span style={{opacity: .27, fontSize: ".6em"}}>{d.substring(150,160)}</span>
    <span style={{opacity: .23, fontSize: ".6em"}}>{d.substring(160,170)}</span>
    <span style={{opacity: .2, fontSize: ".6em"}}>{d.substring(170,180)}</span>
    <span style={{opacity: .17, fontSize: ".6em"}}>{d.substring(180,190)}</span>
    <span style={{opacity: .15, fontSize: ".6em"}}>{d.substring(190,200)}</span>
    <span style={{opacity: .12, fontSize: ".6em"}}>{d.substring(200,210)}</span>
    <span style={{opacity: .1, fontSize: ".6em"}}>{d.substring(210,220)}</span>
    <span style={{opacity: .08, fontSize: ".6em"}}>{d.substring(220,230)}</span>
    <span style={{opacity: .05, fontSize: ".6em"}}>{d.substring(230,240)}</span>
    <span style={{opacity: .03, fontSize: ".6em"}}>{d.substring(240,256)}...</span>
  </div>
  )
}