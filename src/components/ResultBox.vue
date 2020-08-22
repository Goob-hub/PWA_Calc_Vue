.<template>
  <div class="results"> 
       <span>0</span>
  </div>
</template>

<script>
export default {
     name: "resultBox",
}
</script>

<style lang="scss">
//breakpoints
$bp-xxsmall: 26em; //416px
$bp-xsmall: 35.5em; //568px
$bp-small: 48em; // 768px
$bp-medium: 64em; // 1024px
$bp-large: 85.375em; // 1366px
$bp-xlarge: 120em; // 1920px
$bp-xxlarge: 160em; // 2560px

.results{
     margin-bottom: .5em;
     height: 3em;
     display: flex;
     justify-content: flex-end;
     align-items: baseline;
     max-width: 100%;
     max-height: 100px;
     overflow: hidden;
     span{
          max-width: 100%;
          overflow: hidden;
          display: flex;
          font-size: 2em;
     }
     padding: .5em;
     padding-right: 1.5em;
     color: var(--txtclr);
     font-family: var(--ff1);
}

</style>