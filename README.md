# FiapTcAngular2

Este projeto foi gerado utilizando o [Angular CLI](https://github.com/angular/angular-cli) versão 19.2.0.

## Servidor de desenvolvimento

Para iniciar um servidor local de desenvolvimento, execute:

```bash
ng serve
```

Assim que o servidor estiver em execução, abra seu navegador e acesse `http://localhost:4202/`. A aplicação será recarregada automaticamente sempre que você modificar qualquer arquivo de código-fonte.

## Geração de código

O Angular CLI inclui ferramentas poderosas de scaffolding de código. Para gerar um novo componente, execute:

```bash
ng generate component component-name
```

Para uma lista completa dos schematics disponíveis (como `components`, `directives` ou `pipes`), execute:

```bash
ng generate --help
```

## Building

Para realizar o build do projeto, execute:

```bash
ng build
```

Isso irá compilar o projeto e armazenar os artefatos de build no diretório `dist/`. Por padrão, o build de produção otimiza a aplicação para desempenho e velocidade.

## Execução de testes unitários

Para executar testes unitários com o test runner [Karma](https://karma-runner.github.io), utilize o seguinte comando:

```bash
ng test
```

## Execução de testes end-to-end

Para testes end-to-end (e2e), execute:

```bash
ng e2e
```

O Angular CLI não vem com um framework de testes end-to-end por padrão. Você pode escolher aquele que melhor atenda às suas necessidades.

### Conceitos Utilizados

1. **Clean Architecture**
   - Separação clara entre camadas de domínio, aplicação e infraestrutura
   - Independência de frameworks e bibliotecas externas no domínio
   - Inversão de dependências para maior flexibilidade

2. **Module Federation**
   - Integração com outros microfrontends
   - Carregamento dinâmico de módulos remotos
   - Compartilhamento de dependências

3. **Padrões de Projeto**
   - Repository Pattern para abstração de dados
   - Factory Method para criação de objetos
   - Dependency Injection para inversão de controle

4. **Performance da aplicação**
   - Otimização na detecção de mudanças utilizando ChangeDetectionStrategy.OnPush, reduzindo re-renderizações desnecessárias.
   - Implementação de Lazy Loading para diminuir o tempo de carregamento inicial da aplicação.
   - Utilização de Signals para uma gestão de estado local mais eficiente e performática.
   - Aplicação do trackBy em listas para evitar recriação desnecessária do DOM.
   - Uso de Observables para lidar com operações assíncronas de forma reativa e segura.

## Additional Resources

Para mais informações sobre o uso do Angular CLI, incluindo referências detalhadas de comandos, visite a página [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli).
