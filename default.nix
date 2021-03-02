let 
  holonixPath = builtins.fetchTarball {
    url = "https://github.com/holochain/holonix/archive/cdf1d199d5489ebc943b88e552507f1063e3e571.tar.gz";
    sha256 = "1b5pdlxj91syg1qqf42f49sxlq9qd3qnz7ccgdncjvhdfyricagh";
  };
  holonix = import (holonixPath) {
    includeHolochainBinaries = true;
    holochainVersionId = "custom";
    
    holochainVersion = { 
     rev = "hdk-v0.0.100-alpha.1";  
     sha256 = "1fppz2gpgac8dl2wxjipq2386ihcj9aic853prd2mznv9fqqj4bx";  
     cargoSha256 = "0h18qcs9jawmvc09k51bwx58fidqp3456hiz0pwk74122rbs5i7w";
     bins = {
       holochain = "holochain";
       hc = "hc";
     };
    };
  };
in holonix.main
