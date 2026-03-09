import Student from "../models/student.js";


export function createStudent(req,res){

    //console.log(req.user)

    if(req.user==null){
        res.status(403).json({
            message:"Unautherized Access you need to login before creating student "
        })
        return
    }

    if(!req.user.isAdmin){
        res.status(403).json({
            message:"Only Admin can create students"
        })
        return
    }

        const newStudent=new Student(
        {
            name:req.body.name,
            age:req.body.age,
            city:req.body.city
        }
    );
    newStudent.save() .then(
       ()=> {
        res.json(
            {
                message:"Student created Successfully1"
            }
        )

        }
    )
}


export async function createStudentAsync(req,res){
    try{
             
            const newStudent=new Student(
        {
            name:req.body.name,
            age:req.body.age,
            city:req.body.city
        }
    );
    await newStudent.save() 
    res.json({
        message:"Student created successfully2"
    })

    }catch(error){
        console.log("Error creating students")
    };

    
}
 

export function getStudents(req,res){
    
    Student.find().then(
        (students)=>{
            res.json(students)
        }
    )

}