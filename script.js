
document.addEventListener('DOMContentLoaded',function(){
   
    const modal = document.querySelector('.modal');
    const btnClose = document.querySelector('.close');
    const tbody = document.querySelector('#dataList');
    const dataForm = document.querySelector('#dataForm');
    const nameInput = document.querySelector('#nameInput');
    const ageInput = document.querySelector('#ageInput');
    const genderSelect = document.querySelector('#genderSelect');
    

    const editDataForm = document.querySelector('#editDataForm');
    const editNameInput = document.querySelector('#editNameInput');
    const editAgeInput = document.querySelector('#editAgeInput');
    const editGenderSelect = document.querySelector('#editGenderSelect');
    const editIndex = document.getElementById('editIndex');

    loadStoredData();

    // Save the Data to the Local Storage after Submit the Changes

    editDataForm.addEventListener('submit', function(e){

        e.preventDefault();

        const newName =  editNameInput.value.trim();
        const newAge = parseInt(editAgeInput.value);
        const newGender = editGenderSelect.value;
    

        if(newName !== "" && !isNaN(newAge) && newGender !== "")
        {
            const storedData = JSON.parse(localStorage.getItem("userData")) || [];
            const index = editIndex.value; 

            storedData[index].name = newName;
            storedData[index].age = newAge;
            storedData[index].gender = newGender;

            localStorage.setItem("userData", JSON.stringify(storedData));
            editDataForm.reset();
            modal.style.display ="none";
            loadStoredData();
        }
        else
        {
            alert("Please Fill all the Details");
        }
    });

    // Close the Modal when Close Icon is Clicked  

    btnClose.addEventListener('click',function(){
        modal.style.display = "none";
    });

    // Close the Modal when user Clicks the Modal Container

    window.addEventListener('click',function(e){
        if(e.target == modal)
        {
            modal.style.display = "none";
        }
    });

    
// To Load the Data from the Document

    function loadStoredData(){
        const storedData = JSON.parse(localStorage.getItem('userData')) || [];
        tbody.innerHTML = "";
        storedData.forEach((data,index)=>{
            const tr = document.createElement('tr');
            tr.innerHTML = `
            <td>${data.name}</td>
            <td>${data.age}</td>
            <td>${data.gender}</td>
            <td><button type="button" class="btnEdit" data-index=${index}>Edit</button></td>
            <td><button type="button" class="btnDelete" data-index=${index}>Delete</button></td>
            `;
            tbody.appendChild(tr);
        });

        // To Delete Data From the Local Storage

        const btnDelete = document.querySelectorAll('.btnDelete');

        btnDelete.forEach((btn)=>{
            btn.addEventListener('click', deleteData);
        });

        function deleteData()
        {
            if(confirm("Are You Sure To Delete?"))
            {
                const index = this.dataset.index;
                const storedData = JSON.parse(localStorage.getItem("userData")) || [];
                storedData.splice(index, 1);
                localStorage.setItem("userData",JSON.stringify(storedData));
                loadStoredData();
            }
        }

        // To Edit the Data From the Local Storage

        const btnEdit = document.querySelectorAll('.btnEdit');

        btnEdit.forEach((btn)=>{
            btn.addEventListener('click',editData);
        });

        function editData(){
            modal.style.display = "block";
            const index = this.dataset.index;
            const storedData = JSON.parse(localStorage.getItem("userData")) || [];
            
            const data = storedData[index];
            
            editNameInput.value = data.name;
            editAgeInput.value = data.age;
            editGenderSelect.value = data.gender;

            editIndex.value = index;
        }
    }

    // To add Data to the Local Storage

    dataForm.addEventListener('submit', function(e){
        e.preventDefault();

        const name = nameInput.value.trim();
        const age = parseInt(ageInput.value);
        const gender = genderSelect.value;
        
        if(name != "" && !isNaN(age) && gender != "")
        {
            const data = {
                name:name,
                age:age,
                gender:gender
            };
            addToLocalStorage(data);
            loadStoredData();
            dataForm.reset();
        }
        else{
            alert("Please Fill all the Details");
        }
    });

    function addToLocalStorage(data){
        const storedData = JSON.parse(localStorage.getItem("userData")) || [];
        storedData.push(data);
        localStorage.setItem("userData",JSON.stringify(storedData));
    }
});
