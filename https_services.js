// post-put-patch-delete-get methods https://

const fs = require('fs').promises;
const path = require('path');
const dataTasks = path.resolve('data.json');


//validate content task <-create-update-edit->
const validate = ask =>{
    return ask.user && typeof ask.user === 
    'string' && ask.title && typeof ask.title === 'string'
    && ask.task && typeof ask.task === 'string';
    //End validate bool
}


//ACCES ALL DATA
const AccesData = async ()=>{
    //GET METHOD
    const tasks = await fs.readFile(dataTasks, {encoding:'utf8'});
    return JSON.parse(tasks)
}


//CREATE AND PUSH DATA
const CreateData = async (TaskObj)=>{

    //POST METHOD
    let data = await AccesData();

    data = [...data, TaskObj];
    if(validate(TaskObj)){
        TaskObj = {id:data.length, ...TaskObj}
        await fs.writeFile(dataTasks,JSON.stringify(data))
        return {
            status:201,
            message:'The task has been created'
        }
    }
    else {
        return {
            status:400,
            error:{
                message:'Validate your object cualities, all values are strings. Validate: user:String, title:String, task:String'
            }
        }
    }
}


//UPDATE AND PUSH DATA
const UpdateTask = async(TaskObj, id)=>{
    //PUT METHOD
    let data = await AccesData();
    const taskIn = data.findIndex(i=>i.id === id)

    if(validate(TaskObj)) {
        if(taskIn !== -1) {
            data[taskIn] = {id:taskIn,TaskObj}
        }
        else {
            data.push({id:data.length, ...TaskObj})
        }
        fs.writeFile(dataTasks, JSON.stringify(data));
        return {
            status:201,
            message:'The task has been added or actually',
        }
    }
    else  {
        return {
            status:400,
            error:{
                message:'Validate your object cualities, all values are strings. Validate: user:String, title:String, task:String'
            }
        }
    }
}


//UPDATE -- COMPLETE TASK--

const UpdateComplete = async (TaskObj, id)=>{
    //PATCH METHOD
      //PUT METHOD
      let data = await AccesData();
      const taskIn = data.findIndex(i=>i.id === id)
  
          if(taskIn !== -1) {
              data[taskIn] = {id:taskIn,TaskObj};
              fs.writeFile(dataTasks, JSON.stringify(data));
              return {
                status:201,
                message:'The task has been added or actually',
            }
          }
          else {
              return {
                status:400,
                error:{
                    message:'Validate your object cualities, all values are strings. Validate: user:String, title:String, task:String'
                }
              }
          }
}


//DELETE AND CUT DATA
const DeleteTask = async(id)=>{
    //DELETE METHOD
    let data = await AccesData();
    const result = data.filter(t=>t.id !== id);
    if(result.length > 1) {
        data=result;
        fs.writeFile(dataTasks, JSON.stringify(data));
        return {
            status:200,
            message:'Deleted'
        }
    }
    else {
        return {
            status:400,
            error:{
                message:'Incorrect Id'
            }
        }
    }
}

module.exports = {
    AccesData,
    CreateData,
    UpdateTask,
    DeleteTask,
    UpdateComplete,
}