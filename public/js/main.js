$(document).ready(()=>{
    console.log("work");
    var $ = jQuery.noConflict();
    $('#b1').on('click',(e)=>{
        const fname = $('#newf').val();
        const lname = $('#newl').val();
        e.preventDefault();
        $.post('/user',{firstname: fname, lastname: lname},(response)=>{
            console.log(response);
            clearResults();
            if(response.err!=null){
                $('#results').html(`<p style='color:#f44336;'>${response.err}</p>`);
            }else{
                generateCard("Created",response.id,response.firstname,response.lastname);
            }
        });
    });
    $('#b2').on('click',(e)=>{
        e.preventDefault();
        $.get('/user',(response)=>{
            //console.log(response[0]);
            //$('#results').text(JSON.stringify(response,null,4));
             response.forEach(user=>{
                generateCard('Users',user.id,user.firstname,user.lastname);
             });
        });
    });
    $('#b3').on('click',(e)=>{
        const findf = $('#findf').val();
        const replacelname = $('#replacel').val();
        e.preventDefault();
        $.ajax({
            url: '/user',
            type: 'PUT',
            data: {firstname: findf, lastname: replacelname},
            success: function(result) {
                console.log(result.err!=null);
                if(result.err!=null){
                    $('#results').html(`<p style='color:#f44336;'>${result.err}</p>`);

                }else{
                   $('#results').html(`<p>Updated!!</p>`);

                }
            },
            error: (err)=>{
                console.log(err);
            }
        });
    });
    $('#b4').on('click',e=>{
        const findbyf = $('#findbyf').val();
        e.preventDefault();
        $.ajax({
            url: '/user',
            type: 'DELETE',
            data:{firstname: findbyf},
            success: function(result) {
                if(result.err!=null){
                    $('#results').html(`<p style='color:#f44336;'>${result.err}</p>`);

                }else{
                   $('#results').html(`<p>Deleted!!</p>`);

                }
            },
            error: (err)=>{
                console.log(err);
            }
        });
    })
    
    $('.panel li a').on('click',(e)=>{
        clearResults();
    })

    const clearResults = ()=>{
        $('#results').html("");
    }
    const generateCard = (title,id,fname,lname)=>{
        const html = `<div style='margin-top:5px;margin-bottom:5px;'class="uk-card uk-card-primary uk-card-body">
                                    <h3 class="uk-card-title">${title}</h3>
                                    <p>id : ${id}</p>
                                    <p>First name : ${fname}</p>
                                    <p>Last Name : ${lname}</p>
                     </div>`;
                     $('#results').append(html);
        
    }
});