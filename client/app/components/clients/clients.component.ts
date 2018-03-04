import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service'
import { TherapistService} from '../../services/therapist.service'
import { Therapist } from '../../../Therapist';
import { Client } from '../../../Client';
// import { SharedService } from './../../services/shared_service/shared.service';



@Component({
    moduleId: module.id,
    selector: 'clients',
    templateUrl: 'clients.component.html'
})





export class ClientsComponent implements OnInit{
    therapist_result: Therapist;
    clients: Client[];
    therapists: Therapist[];
    name: string;
    password: string;
    age: string;
    hobby: string;
    client: Client;
    clientname: string;


    ngOnInit(){
        this.therapistService.getTherapists()
            .subscribe(therapists => {
                this.therapists = therapists; });


        this.clientService.getClients()
        .subscribe(clients => {
            this.clients = clients;
        });
    };
    constructor(private clientService:ClientService, private therapistService:TherapistService){

        // this.therapistService.TherapistResault.subscribe( therapist => {
        //     this.therapist_result = therapist;
        // });
        
    }

    addClient(event){
        event.preventDefault();
        var newClient = {
            name:this.name,
            password: this.password,
            hobby: this.hobby,
            age: this.age
        }

        this.clientService.addClient(newClient)
            .subscribe(client=>{
                this.clients.push(client);
                this.name = '';
                this.password = '';
                this.hobby = '';
                this.age = '';
            });
    }

    deleteClient(id){
        var clients = this.clients;
        this.clientService.deleteClient(id).subscribe(data => {
            if(data.n == 1){
                for (var i = 0; i < clients.length; i++){
                    if(clients[i]._id == id){
                        clients.splice(i, 1);
                    }
                }
            }
        });
    }

    updateStatus(client){
        var _client = {
            _id:client._id,
            name: client.name,
            password: client.password,
            hobby: client.hobby,
            age: client.age
        };

        this.clientService.updateStatus(_client).subscribe(data => {});
    }


    generateTherapist(event){
        event.preventDefault();
        var therapists = this.therapists;
        console.log(therapists);
        var i;
        var best = 0;
        var bestCandidate = therapists[0];
        //error when 1 therapist or fewer
        for (i=0; i < therapists.length; i++){
            var score = 0;
            if (therapists[i].hobby != null && therapists[i].hobby == this.hobby){

                score++;
            }
            if (therapists[i].age != null && (therapists[i].age - this.age) <= 10 && (therapists[i].age - this.age) > 0){

                score++;
            }
            if (score > best){
                best = score;
                bestCandidate = therapists[i];
            }
        }
        console.log(bestCandidate);
        this.therapist_result = bestCandidate;


        return bestCandidate;
    }
}