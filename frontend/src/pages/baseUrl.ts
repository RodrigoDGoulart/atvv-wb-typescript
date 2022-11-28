export default class URLs {
    constructor(){}
    
    public basicUrl: string = 'http://localhost:5173/';
    public clientes = this.basicUrl + 'clientes';
    public servicos = this.basicUrl + 'servicos';
    public produtos = this.basicUrl + 'produtos';
    public relatorio = this.basicUrl + 'menu-relatorio'
}