namespace AHAKTVPLAYER
{
    partial class Form1
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.components = new System.ComponentModel.Container();
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(Form1));
            this.playerPanel = new System.Windows.Forms.Panel();
            this.mplayer1 = new AxWMPLib.AxWindowsMediaPlayer();
            this.PlaylistTimer = new System.Windows.Forms.Timer(this.components);
            this.playerPanel.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.mplayer1)).BeginInit();
            this.SuspendLayout();
            // 
            // playerPanel
            // 
            this.playerPanel.Controls.Add(this.mplayer1);
            this.playerPanel.Location = new System.Drawing.Point(12, 12);
            this.playerPanel.Name = "playerPanel";
            this.playerPanel.Size = new System.Drawing.Size(1256, 633);
            this.playerPanel.TabIndex = 0;
            // 
            // mplayer1
            // 
            this.mplayer1.Enabled = true;
            this.mplayer1.Location = new System.Drawing.Point(3, 3);
            this.mplayer1.Name = "mplayer1";
            this.mplayer1.OcxState = ((System.Windows.Forms.AxHost.State)(resources.GetObject("mplayer1.OcxState")));
            this.mplayer1.Size = new System.Drawing.Size(1250, 627);
            this.mplayer1.TabIndex = 0;
            // 
            // PlaylistTimer
            // 
            this.PlaylistTimer.Interval = 1000;
            this.PlaylistTimer.Tick += new System.EventHandler(this.PlaylistTimer_Tick);
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1280, 657);
            this.ControlBox = false;
            this.Controls.Add(this.playerPanel);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            this.Name = "Form1";
            this.Text = "Form1";
            this.Load += new System.EventHandler(this.Form1_Load);
            this.playerPanel.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.mplayer1)).EndInit();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Panel playerPanel;
        private AxWMPLib.AxWindowsMediaPlayer mplayer1;
        private System.Windows.Forms.Timer PlaylistTimer;
    }
}

