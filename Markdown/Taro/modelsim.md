进入调试：

点击 simulate - startsimulate - 点击work旁边的加号 - 选择测试文件

还要点击右下角的 options - 选择第二个 Apply full - 点击ok 再ok， 之后会弹出几个窗口

选择objects窗口的所有变量点击右键 - 选择 add wave

出现波形图了，再选择波形图类所有变量右键 - 选择radix 为 unsigned

最后在左下角终端中输入 run 1ms - 回车即可



```verilog
module count60(clk, reset, g_data, s_data);
  
  input clk, reset;
  output[3:0] g_data;
  output[2:0] s_data;
  
  reg[3:0] g_data;
  reg[2:0] s_data;
  
  always @(posedge clk)
  begin 
    if(~reset)
      g_data <= 0;
      
    else if(g_data == 9)
      g_data <= 0;
      
    else
      g_data <= g_data + 1;
  end
    
  always @(posedge clk)
  begin 
  
    if(~reset)
      g_data <= 0;
      
    else if(g_data == 9)
    begin
      if(s_data == 5)
        s_data <= 0;
      else
        s_data <= s_data + 1;
    end
              
  end

endmodule
```

```verilog
`timescale 1ns/1ns

module test1;
  
reg clk, reset;
wire[3:0] g_data;
wire[2:0] s_data;

count60 u1(.clk(clk), .reset(reset), .g_data(g_data), .s_data(s_data));

always
  #10 clk = ~clk;
  
initial
begin
    clk = 0; reset = 1;
#65 reset = 0;
#80 reset = 1;
end

endmodule
```

